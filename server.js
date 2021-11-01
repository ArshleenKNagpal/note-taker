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
app.get("/notes", function (req, res) {
res.sendFile(path.join(__dirname, "public/notes.html"));
});

//route
app.get("/", function (req, res) {
res.sendFile(path.join(__dirname, "public/index.html"));
});

// API GET
app.get("/api/notes", function (req, res) {
console.log("/api/notes-get");
res.json(db);
});

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
//   });



//API POST

app.post("/api/notes", (req, res) => {

  const { title, text } = req.body;
  
  const newNote = {
  title,
  text,
  id: uuid.v1(),
  }
  fs.readFile("./db/db.json", (err, data) => {
  const parsedNotes = JSON.parse(data)
  parsedNotes.push(newNote)
  
  fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
  err
  ? console.log(err)
  : console.log("new Note Saved")
  )
  })
  res.sendFile(path.join(__dirname, "./db/db.json"))
  })



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