const path = require("path");
const express = require("express");
const fs = require("fs")
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

//data for current 5 tables
app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data)
    console.log(jsonData)
    res.json(jsonData);
  })
  });

 
// Create New reservations - takes in JSON input
app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    
    const newNote = req.body;
    
    console.log(newNote);
    
    res.json(newNote);
    
    notes.push(newNote);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf8', function (err) {
      if (err) throw err;
      console.log('Note Added!');
    });

   return newNote;
   
  });


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
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
