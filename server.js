const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// This middleware is responsible for constructing the
// body property on the response object passed to our route handlers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//empty for user
let notes = [];

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/assets")));
app.use(express.static(path.join(__dirname, "/public/assets/js")));
app.use(express.static(path.join(__dirname, "/public/assets/css")));

// Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//data for current 5 tables
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

let lastId = 2;

// Create New reservations - takes in JSON input
app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware

  const newNote = req.body;

  lastId += 1;
  newNote["id"] = lastId;

  console.log(newNote);

  notes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf8", function (
    err
  ) {
    if (err) throw err;
  });

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;

    res.json(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.delete("/api/notes/:id", (req, res) => {


    const requestId = Number(req.params.id);

    notes = notes.filter((note) => {
      return note.id !== requestId;
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf8", function (
      err
    ) {
      if (err) throw err;
    });

    res.sendStatus(200);
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
