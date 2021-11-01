//dependencies
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const db = require("./Develop/db/db.json");


// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Middleware
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API GET
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//API POST
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = notes.length.toString(); 

    // if any data in req.body is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.'); 
    
    } else {
        // add note to json file and animals array in this function 
        const note = createNewNote(req.body, notes); 

        res.json(note);
    }
});


// Delete note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;

    notes.map((element, index) => {
      if (element.id == id){
        note = element
        notes.splice(index, 1)
        return res.json(note);
      } 
    
    })
});

// chain listen() method onto our servers
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

//Write to db.json
function writeToDB(array) {
  fs.writeFileSync("./db/db.json", JSON.stringify(array));
}
