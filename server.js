let express = require("express"); 
let path = require("path"); 
let db = require("./db/db.json"); 
let fs = require("fs"); 
let util =- require("util"); 

let app = express(); 

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile); 


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json()); 


//static webpages that were given at start of homework
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//beginning of API usage GET/POST/DELETE 

app.get("api/notes", function (req, res) {
    readFileAysync("./db/db.json", "utf8").then(function (data) {
        data = JSON.parse(data)
        return res.json(data); 
    });  
});

//posting to the array while appending latest note 
app.post("api/notes", function (req, res) {
    let newNotes = req.body; 
    readFileAysync("./db/db.json", "utf8").then(function (data) {
        data = JSON.parse(data)
        data.push(newNotes); 
        data[data.length - 1].id=data.length-1; 
        writeFileAsync("./db/db.json", JSON.stringify(data)); 
    });
    res.send("Created some notes!") 
});


//deleting newest entry
app.delete("/api/notes/:id", function (req, res) {
    var idInput = req.params.id

    readFileAysync("./db/db.json", "utf8").then(function (data) {
        data = JSON.parse(data)

        data.splice(idInput, 1); 

        for (let i = 0; i < data.length; i++) {
            data[i].id=1;
        };

        writeFileAsync("./db/db.json", JSON.stringify(data)); 
    });
    res.send("Deleted!")
});

//port identification for local server 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});