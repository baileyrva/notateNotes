const Note = require("../models/note.model.js");

//create and save a new note
exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note cannot be empty"
    });
  }

  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  note
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "There was an error."
      });
    });
};

//gets all notes from database
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving notes."
      });
    });
};

//finding a single note using a noteID
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "No ID matches " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No ID matches " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "There was an error retrieving the note " + req.params.noteId
      });
    });
};

//update a note using noteID
exports.update = (req, res) => {};

//delete a note using noteID
exports.delete = (req, res) => {};
