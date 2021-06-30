// ROUTER

const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

// GETs and POSTs

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    let queryText = 'SELECT * FROM "artist";';
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
    const newArtist = req.body;
    const queryText = `
    INSERT INTO artist (name, birthdate)
    VALUES ($1, $2);
    `;

    pool.query(queryText, [newArtist.name, newArtist.birthdate])
    .then(dbResponse => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Could not create a new artist.', error);
        res.sendStatus(500);
    });
});

module.exports = router;