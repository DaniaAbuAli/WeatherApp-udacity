// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/all", (req, res) => {
  res.send(projectData);
});
app.post("/add", (req, res) => {
  console.log(req.body);
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feel,
  };
  res.send(projectData);
});
const port = 9000;
app.listen(port, () => {
  console.log("success");
});
