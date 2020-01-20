const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parsing encoded url
app.use(bodyParser.urlencoded({ extended: true }));

// parsing json
app.use(bodyParser.json);


// outlining routes
app.get("/", (req, res) => {
  res.json({
    message:
      "This is the Notating Notes application. Stuck in a meeting? Take note. Wide awake at night with ideas? Take note. Wherever you are and whatever you're doing...take note."
  });
});

app.listen(3000, () => {
    console.log("Listening on port 3000"); 
});
