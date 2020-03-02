'use strict'

const path = require('path');
const express = require('express'); 
// const db = require('./database');

const port = 4000;

const publicPath = path.join(__dirname, 'public');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//logging
var morgan = require('morgan')
var router = express.Router();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Console logging
app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: true,
}));

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});


app.get("/", (req, res) => {
    res.send("HEJSAN PÅ DEJSAN")
})