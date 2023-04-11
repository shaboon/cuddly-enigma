const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for retrieving all the tips
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newTip = {
      noteTitle,
      noteText,
    };

    readAndAppend(newTip, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = notes;
