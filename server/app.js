const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.use("/api/v3/app/events", eventRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
