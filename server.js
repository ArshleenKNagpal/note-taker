//dependencies
const express = require("express");
const app = express();
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");


// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Middleware
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
// API GET
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API GET
app.get("/api/notes", function (req, res) {
  console.log("/api/notes-get");
  res.json(db);
});

//API POST
app.post("/api/notes", function (req, res) {
  const note = req.body;
  note.id = uuid.v1();
  db.push(note);
  writeToDB(db);
  return res.json(db);
});

// Delete note

app.delete("/api/notes/:id", (req, res) => {
  readFileAsync(db_FILE, "utf8").then((data) => {
    const notesArray = JSON.parse(data);
    notesArray = notesArray.filter((note) => note.id !== req.params.id);
    writeFileAsync(db_FILE, JSON.stringify(notesArray)).then(() => {
      return res.json(notesArray);
    });
  });
});

//Write to db.json
function writeToDB(array) {
  fs.writeFileSync("./db/db.json", JSON.stringify(array));
}

// chain listen() method onto our servers
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
