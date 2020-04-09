const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const notes = []

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user to notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Basic route that sends the user to index.html
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//write notes to file
fs.appendFile("db/db.json", notes, function(err) {
    if (err) throw err;
    console.log("Note Added");
});

app.get("/api/notes", (req, res) => {
    return res.json(notes);
  });

app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
  
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
  });


// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
  