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
const session = require('express-session')
const uuid4 = require('uuid4');
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

app.use(session({
    name: "session",
    genid: () => {return uuid4()},
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24,
        httpOnly: false,
        // secure: true,
        // domain: "127.0.0.1"
    }
}))

const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const todo = require('./todo')
// const auth = require('./auth')

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});

// app.use(express.static(path.join(__dirname, '../client/todoapp/build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/todoapp/build', 'index.html'))
// })

app.get('/api/users', (req, res) => {
    console.log(req.session)
    db.all('SELECT * FROM User', (err, rows) => {
        res.send(rows)
    })
})

app.use('/api/login', login)
app.use('/api/logout', logout)
app.use('/api/register', register)
app.use('/api/todo', todo)
// app.use('/api/test', auth)