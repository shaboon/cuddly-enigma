const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../../helpers/fsUtils");
const uuid = require("../../helpers/uuid");

// GET Route for retrieving all the tips
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//GET Route for retrieving specific tip via #id
notes.get("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// POST Route for a new UX/UI tip
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    console.log(newNote);

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

// notes.delete("/:note_id", (req, res) => {
//   console.info(`${req.method} request received for note`);
//   readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
// });

module.exports = notes;
