// const fs = require("fs");

// fs.writeFile("Omar.txt", "Task 1: Learn DB", (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log("File created");

//     fs.appendFile("Omar.txt", "Hello Team", (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         console.log("Content appended");

//         fs.readFile("Omar.txt", "utf8", (err, data) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }

//             console.log(data);

//             fs.unlink("Omar.txt", (err) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }

//                 console.log("File deleted");
//             });
//         });
//     });
// });





// ---------------------------------------------------------------------------------------

require("dotenv").config();

const express = require("express");

const connectDB = require("./config/connectdb");

const userRoutes = require("./routes/user.route");

const app = express();

connectDB();

app.use(express.json());

app.use("/users", userRoutes);

app.use((req, res) => {

    res.status(404).json({

        message: "Route Not Found"

    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on ${PORT}`);

});