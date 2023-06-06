const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const upload = multer({ dest: "uploads/" });
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bhupattii",
  database: "dt_schema",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v3/app/events", (req, res) => {
  const sqlGet = "SELECT * FROM event_db";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      res.send(result);
    }
  });
});

app.post("/api/v3/app/events", upload.single("photo"), (req, res) => {
  const {
    name,
    tagline,
    description,
    moderator,
    category,
    sub_category,
    schedule,
    rigor_rank,
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  const sqlInsert =
    "INSERT INTO event_db (name, tagline, description, moderator, category, sub_category, photo, schedule, rigor_rank) VALUES(?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      name,
      tagline,
      description,
      moderator,
      category,
      sub_category,
      photo,
      schedule,
      rigor_rank,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete("/api/v3/app/events/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM event_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/api/v3/app/events/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM event_db WHERE id = ?";
  // "SELECT * FROM event_db WHERE name is ascending"
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      const eventData = result.length ? result[0] : [];
      res.send(eventData);
    }
  });
});

app.put("/api/v3/app/events/:id", upload.single("photo"), (req, res) => {
  const { id } = req.params;
  const {
    name,
    tagline,
    description,
    moderator,
    category,
    sub_category,
    schedule,
    rigor_rank,
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  const sqlUpdate =
    "UPDATE event_db SET name = ?, tagline = ?, description =?, moderator = ?, category = ?, sub_category = ?, photo = ?, schedule = ?, rigor_rank = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [
      name,
      tagline,
      description,
      moderator,
      category,
      sub_category,
      photo,
      schedule,
      rigor_rank,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
      } else {
        res.send(result);
      }
    }
  );
});

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
