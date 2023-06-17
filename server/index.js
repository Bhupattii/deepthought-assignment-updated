// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const mysql = require("mysql2");
// const cors = require("cors");
// const path = require("path");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "bhupattii",
//   database: "dt_schema",
// });

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// // Storage configuration for Multer
// const storage = multer.diskStorage({
//   destination: "./uploads", // Specify the directory to store uploaded files
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Define the filename for the uploaded file
//   },
// });
// const upload = multer({ storage });

// // Handle MySQL connection errors
// // db.getConnection((err, connection) => {
// //   if (err) {
// //     console.error("Error connecting to MySQL server:", err);
// //     process.exit(1); // Exit the application on connection error
// //   }
// //   connection.release(); // Release the connection
// //   console.log("Connected to MySQL server");
// // });

// // Handle MySQL connection errors
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to MySQL server:", err.stack);
//     return;
//   }

//   connection.on("error", (error) => {
//     console.error("MySQL connection error:", error.stack);
//     // You can handle the error here or propagate it to the application
//   });

//   connection.release(); // Release the connection
//   console.log("Connected to MySQL server");
// });

// app.get("/api/v3/app/events", (req, res) => {
//   const sqlGet = "SELECT * FROM event_db";
//   db.query(sqlGet, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("An error occurred");
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/api/v3/app/events", upload.single("photo"), (req, res) => {
//   const {
//     name,
//     tagline,
//     description,
//     moderator,
//     category,
//     sub_category,
//     schedule,
//     rigor_rank,
//   } = req.body;

//   const photo = req.file ? req.file.filename : null;

//   const sqlInsert =
//     "INSERT INTO event_db (name, tagline, description, moderator, category, sub_category, photo, schedule, rigor_rank) VALUES(?,?,?,?,?,?,?,?,?)";
//   db.query(
//     sqlInsert,
//     [
//       name,
//       tagline,
//       description,
//       moderator,
//       category,
//       sub_category,
//       photo,
//       schedule,
//       rigor_rank,
//     ],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("An error occurred");
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });

// app.delete("/api/v3/app/events/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlRemove = "DELETE FROM event_db WHERE id = ?";
//   db.query(sqlRemove, id, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("An error occurred");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// app.get("/api/v3/app/events/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlGet = "SELECT * FROM event_db WHERE id = ?";
//   db.query(sqlGet, id, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("An error occurred");
//     } else {
//       const eventData = result.length ? result[0] : {};
//       if (eventData) {
//         res.send(eventData);
//       } else {
//         res.status(404).send("Record not fount");
//       }
//     }
//   });
// });

// app.put("/api/v3/app/events/:id", upload.single("photo"), (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     tagline,
//     description,
//     moderator,
//     category,
//     sub_category,
//     schedule,
//     rigor_rank,
//   } = req.body;

//   const photo = req.file ? req.file.filename : null;

//   const sqlUpdate =
//     "UPDATE event_db SET name = ?, tagline = ?, description =?, moderator = ?, category = ?, sub_category = ?, photo = ?, schedule = ?, rigor_rank = ? WHERE id = ?";
//   db.query(
//     sqlUpdate,
//     [
//       name,
//       tagline,
//       description,
//       moderator,
//       category,
//       sub_category,
//       photo,
//       schedule,
//       rigor_rank,
//       id,
//     ],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("An error occurred");
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.listen(3001, (error) => {
//   if (error) {
//     console.error("Error starting the server:", error);
//     // Send response indicating server startup error
//     console.error("Error starting the server:", error);
//     process.exit(1); // Exit the application on error
//   }
//   console.log("Server is running on port 3001");
// });
