const mongoose = require("mongoose");
const User = require("../models/user.model");




exports.getUsers = async (req, res) => {

    const users = await User.find();

    res.status(200).json(users);

};



exports.getUser = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ObjectId"
        });

    const user = await User.findById(id);

    if (!user)
        return res.status(404).json({
            message: "User not found"
        });

    res.status(200).json(user);

};





exports.createUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (err) {

        if (err.code === 11000)

            return res.status(409).json({
                message: "Duplicate Email"
            });

        const errors = {};

        if (err.errors) {

            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });

            return res.status(400).json(errors);

        }

        res.status(500).json({
            message: err.message
        });

    }

};





exports.updateUser = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ObjectId"
        });

    try {

        const user = await User.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!user)

            return res.status(404).json({
                message: "User not found"
            });

        res.status(200).json(user);

    }

    catch (err) {

        if (err.code === 11000)

            return res.status(409).json({
                message: "Duplicate Email"
            });

        const errors = {};

        if (err.errors) {

            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });

            return res.status(400).json(errors);

        }

        res.status(500).json({
            message: err.message
        });

    }

};



exports.deleteUser = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))

        return res.status(400).json({
            message: "Invalid ObjectId"
        });

    const user = await User.findByIdAndDelete(id);

    if (!user)

        return res.status(404).json({
            message: "User not found"
        });

    res.status(200).json({

        message: "User Deleted"

    });

};





exports.searchUser = async (req, res) => {

    const { email } = req.query;

    const users = await User.find({

        email: {

            $regex: email,

            $options: "i"

        }

    });

    res.status(200).json(users);

};