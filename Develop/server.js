// Dependencies
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
let notes = require('./db/db')

//Functions
const saveNotes = function(){fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => 
    {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};
// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    res.json(notes)
});

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    newNote.id = uniqid();

    notes.push(newNote);

    saveNotes();

    res.json(newNote);
}); 

app.delete('/api/notes/:id', (req,res) => {
    reaperID = parseInt(req.params.id);
    notes = notes.filter((note) => note.id !== reaperID);

    saveNotes();
    res.json(notes)
});

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});