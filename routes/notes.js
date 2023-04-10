const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the tips
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = notes;
