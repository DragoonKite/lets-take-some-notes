// Dependencies
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');

const app = express();
const PORT = 3001;

// Data
const notes = require('./db/db')

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
    res.json(newNote);
}); 


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});