//dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const uuid = require("uuid");
const db = require("./db/db.json");


// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3003;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



//route
app.get("/", (req, res) => {
  // "__dirname" is a global obj and gives you the path of the currently running file
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Read the db.json file and displays all the saved notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
//   });


// Display a single note
app.get("/api/notes/:note", function (req, res) {
  var noteSelect = req.params.note;
  console.log(noteSelect);
  res.json(noteSelect);
});

//API POST

// app.post("/api/notes", (req, res) => {

//   const { title, text } = req.body;
  
//   const newNote = {
//   title,
//   text,
//   id: uuid.v1(),
//   }
//   fs.readFile("./db/db.json", (err, data) => {
//   const parsedNotes = JSON.parse(data)
//   parsedNotes.push(newNote)
  
//   fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
//   err
//   ? console.log(err)
//   : console.log("new Note Saved")
//   )
//   })
//   res.sendFile(path.join(__dirname, "./db/db.json"))
//   })



app.post("/api/notes", (req, res) => {
  // Should receive a new note to save on the request body

  const addedNote = req.body;
  // create a unique identifier with Date.now()
  addedNote.id = Date.now();
  // Add it to the db.json file
  let noteData = fs.readFileSync("./db/db.json");
  // Create new notes - takes in JSON input and parses the data
  let noteTaker = JSON.parse(noteData);
  // Push addedNote to array
  noteTaker.push(req.body);
  // Write and stringify new array
  fs.writeFileSync("./db/db.json", JSON.stringify(noteTaker), (err, data) => {
      if (err) throw err;
      res.json(noteTaker);
  });
  // send the new added note/response back to the client
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);


// Delete note
app.delete("/api/notes/:id", function (req, res) {
  const id = req.params.id;
for (let i = 0; i < db.length; i++) {
if (db[i].id == id) {
db.splice(i, 1);
writeToDB(db);
res.json(db);
break;
}
}
});








//Write to db.json
function writeToDB(array) {
fs.writeFileSync("./db/db.json", JSON.stringify(array));
}



app.listen(PORT, function () {
console.log("App listening on PORT: " + PORT);
});