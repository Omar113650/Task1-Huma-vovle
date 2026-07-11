const http = require("http");

const PORT = 3000;

let students = [
  { id: 1, name: "Omar", age: 22 },
  { id: 2, name: "Ahmed", age: 21 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/students") {
    res.writeHead(200);
    return res.end(JSON.stringify(students));
  }

  if (req.method === "POST" && req.url === "/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const student = JSON.parse(body);

      students.push(student);

      res.writeHead(201);
      res.end(
        JSON.stringify({
          message: "Student Added Successfully",
          student,
        }),
      );
    });

    return;
  }

  if (req.method === "PUT" && req.url === "/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const updatedStudent = JSON.parse(body);

      const index = students.findIndex(
        (student) => student.id === updatedStudent.id,
      );

      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Student Not Found" }));
      }

      students[index] = updatedStudent;

      res.writeHead(200);
      res.end(
        JSON.stringify({
          message: "Student Updated Successfully",
          student: updatedStudent,
        }),
      );
    });

    return;
  }

  if (req.method === "DELETE" && req.url === "/students") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { id } = JSON.parse(body);

      const index = students.findIndex((student) => student.id === id);

      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Student Not Found" }));
      }

      students.splice(index, 1);

      res.writeHead(200);
      res.end(
        JSON.stringify({
          message: "Student Deleted Successfully",
        }),
      );
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route Not Found" }));
});

server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
