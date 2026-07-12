const express = require("express");

const router = express.Router();

const {

    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUser

} = require("../controllers/user.controller");

router.get("/", getUsers);

router.get("/search", searchUser);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;