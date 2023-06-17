const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bhupattii",
  database: "dt_schema",
});

const eventModel = {
  getAllEvents: (callback) => {
    const sqlGet = "SELECT * FROM event_db";
    db.query(sqlGet, callback);
  },

  createEvent: (eventData, callback) => {
    const {
      name,
      tagline,
      description,
      moderator,
      category,
      sub_category,
      photo,
      schedule,
      rigor_rank,
    } = eventData;

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
      callback
    );
  },

  deleteEvent: (eventId, callback) => {
    const sqlRemove = "DELETE FROM event_db WHERE id = ?";
    db.query(sqlRemove, eventId, callback);
  },

  getEvent: (eventId, callback) => {
    const sqlGet = "SELECT * FROM event_db WHERE id = ?";
    db.query(sqlGet, eventId, callback);
  },

  updateEvent: (eventId, eventData, callback) => {
    const {
      name,
      tagline,
      description,
      moderator,
      category,
      sub_category,
      photo,
      schedule,
      rigor_rank,
    } = eventData;

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
        eventId,
      ],
      callback
    );
  },
};

module.exports = eventModel;
