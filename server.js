const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parsing encoded url
app.use(bodyParser.urlencoded({ extended: true }));

// parsing json
app.use(bodyParser.json());

//database setup
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//database connection
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.log("Could not connect", err);
    process.exit();
  });

// outlining get and listen routes
app.get("/", (req, res) => {
  res.json({
    message:
      "This is the Notating Notes application. Stuck in a meeting? Take note. Wide awake at night with ideas? Take note. Wherever you are and whatever you're doing...take note."
  });
});

//requiring notes routes
require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
