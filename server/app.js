'use strict'

const path = require('path');
const express = require('express'); 
const db = require('./database');

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

const login = require('./login')
const register = require('./register')

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM User', (err, rows) => {
        res.send(rows)
    })
})

app.use('/login', login)
app.use('/register', register)