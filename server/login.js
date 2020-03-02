'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
    const {username, password} = req.body;
    
    db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Database error"})
            console.log(err)
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"Username or password wrong."})
            return
        }

        bcrypt.compare(password, row.password, (err, equal) => {
            if (equal) {
                res.status(200).json({"status":"Login successful."})
                return
            } else {
                res.status(404).json({"error":"Wrong username or password."})
                return
            }
        })
    })
})

module.exports = router