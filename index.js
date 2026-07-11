const fs = require("fs");

fs.writeFile("Omar.txt", "Task 1: Learn DB", (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("File created");

    fs.appendFile("Omar.txt", "Hello Team", (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("Content appended");

        fs.readFile("Omar.txt", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(data);

            fs.unlink("Omar.txt", (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log("File deleted");
            });
        });
    });
});





// ---------------------------------------------------------------------------------------




