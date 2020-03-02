'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database')

router.post('/', (req, res) => {
    const {username, password} = req.body

    //TODO
    //Register email instead?
    //or lowercase all usernames in database

    db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
        if (row === undefined) {

            const st = db.prepare('INSERT INTO User (username, password) VALUES (?, ?)');
            st.run([username, password]);
            st.finalize();

            res.status(200).json({"status":"User succesfully registered"})

        } else {
            res.status(404).json({"error":"User already exists"})
        }
    })
    
})

module.exports = router