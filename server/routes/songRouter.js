const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    let queryText = 'SELECT * FROM "song";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error trying to get the songs from Postrgres', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `
    INSERT INTO song (title, length, released)
    VALUES ($1, $2, $3);
    `;

    pool.query(queryText, [newSong.title, newSong.length, newSong.released])
    .then(dbResponse => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Could not create a new song.', error);
        res.sendStatus(500);
    });
});

module.exports = router;