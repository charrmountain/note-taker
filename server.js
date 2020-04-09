const path = require("path");
const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// This middleware is responsible for constructing the
// body property on the response object passed to our route handlers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//empty for user
const notes = []

// Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//data for current 5 tables
app.get("/api/notes", (req, res) => {
     res.json(notes);
  });

 
// Create New reservations - takes in JSON input
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
// create another route for reservation
// view tables & home page
// posts for clear tables
// posts for making reservations
//
