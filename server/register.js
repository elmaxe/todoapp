'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database')
const bcrypt = require('bcrypt')

const saltRounds = 12;

router.post('/', (req, res) => {
    const {username, password} = req.body

    //TODO
    //Register email instead?
    //or lowercase all usernames in database

    db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Database error"})
            console.log(err)
            return
        }

        if (row === undefined) {

            const st = db.prepare('INSERT INTO User (username, password) VALUES (?, ?)');

            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({"error":"Something went wrong when hashing."})
                    return;
                }

                bcrypt.hash(password, salt, (err2, hash) => {
                    if (err2) {
                        console.log(err2)
                        res.status(500).json({"error":"Something went wrong when hashing."})
                        return;
                    }
                    //Insert hash and username
                    st.run([username, hash]);
                    st.finalize();
                    res.status(200).json({"status":"User succesfully registered"})
                })
            })

        } else {
            res.status(403).json({"error":"User already exists"})
        }
    })
})

module.exports = router