let express = require("express");
let path = require("path");
let db = require("./db/db.json");
let fs = require("fs");
let util = require("util");

let app = express();

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const PORT = 3000;

//Express middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

//static files given from homework 
app.use(express.static(path.join(__dirname, "public")));


//create routing to serve notes html when the user clicks the button
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//reading the db.json file 
app.get("/api/notes", function(req, res) {
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    data = JSON.parse(data);
    // console.log(data)
    return res.json(data);
  });
});

//recieves a note and then adds it to the list on left hand side 
app.post("/api/notes", function(req, res) {
  var newNotes = req.body;

  //read the db.json file to grab the arrays of object and return json
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    data = JSON.parse(data);
    data.push(newNotes);

    // appending the new note
    data[data.length - 1].id = data.length - 1;

    //updating database file 
    writeFileAsync("./db/db.json", JSON.stringify(data));
  });
  res.send("created notes!");
});

app.delete("/api/notes/:id", function(req, res) {
  var idReceived = req.params.id;
  console.log(idReceived);

  //read the db.json file to grab the arrays of object and return json
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    //turn object into string
    data = JSON.parse(data);

    //array splice will remove the position I ask it
    data.splice(idReceived, 1);

    //the for loop to reset the index of the array
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
    }

    //once the new note is added to the array from db.json file then write the upated changes
    writeFileAsync("./db/db.json", JSON.stringify(data));
  });
  res.send("cleared!");
});

app.listen(PORT, function() {
  console.log("listening on port " + PORT);
});
