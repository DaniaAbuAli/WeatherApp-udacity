// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

const port = 8000;
app.post("/add", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feel,
  };
  res.send(projectData);
});
app.listen(port, () => {
  console.log("success");
});
