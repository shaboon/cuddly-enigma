const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

// ports for local and heroku
const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", api);

app.use(express.static("public"));

// Route for landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route for note-taking page - routed via index.js
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
