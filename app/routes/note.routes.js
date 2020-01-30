module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    //new note
    app.post('/notes', notes.create); 

    //get all the notes
    app.get('/notes', notes.findAll);

    //get single note
    app.get('/notes/:noteId', notes.findOne); 

    //update single note using an ID 
    app.put('/notes/:noteId', notes.update);

    //delete a single note using an ID
    app.delete('/notes/:noteId', notes.delete);
}