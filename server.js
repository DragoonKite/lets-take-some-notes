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
app.use(express.static(__dirname + '/Develop/public'));

// Data
let notes = require('./Develop/db/db')

//Functions
const saveNotes = function(){fs.writeFile(path.join(__dirname, '/Develop/db/db.json'), JSON.stringify(notes), (err) => 
    {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    return res.json(notes)
});

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    newNote.id = uniqid();

    notes.push(newNote);

    saveNotes();

    res.json(newNote);
}); 

app.delete('/api/notes/:id', (req,res) => {
    reaperID = req.params.id;
    notes = notes.filter((note) => note.id !== reaperID);

    saveNotes();
    res.json(notes)
});

// Listener
app.listen(process.env.PORT || PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});