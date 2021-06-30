// SERVER SETUP

const express = require('express');
const bodyParser = require('body-parser');
const artistRouter = require('./routes/artistRouter');
const songRouter = require('./routes/songRouter');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

app.use('/song', songRouter);
app.use('/artist', artistRouter);

