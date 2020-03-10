'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database')
const bcrypt = require('bcrypt')

const saltRounds = 12;


const validateUserData = (req, res, next) => {
    const {username, password} = req.body
    if (!username || ! password) {
        res.status(400).json({"error":"Missing credentials"})
        return
    }

    if (username.length < 4) {
        res.status(400).json({"error":"Username should be at least 4 characters long."})
        return
    }
    
    if (password.length < 5) {
        res.status(400).json({"error":"Password should be at least 5 characters long."})
        return
    }

    next()
}

router.post('/', validateUserData, (req, res, next) => {
    const {username, password} = req.body

    //TODO
    //Register email instead?

    const getUsername = db.prepare('SELECT * FROM User WHERE username = ?');

    db.serialize(() => {
        getUsername.get([username], (err, row) => {
            if (err) {
                res.status(500).json({"error":"Database error"})
                console.log(err)
                return
            }

            if (row === undefined) {

                const st = db.prepare('INSERT INTO User (username, password, regDate) VALUES (?, ?, ?)');

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
                        st.run([username, hash, Date.now()]);
                        st.finalize();
                        res.status(200).json({"status":"Account registered."})
                    })
                })

            } else {
                res.status(403).json({"error":"User already exists"})
            }
        })
        getUsername.finalize();
    })
})

module.exports = router
module.exports.saltRounds = saltRounds