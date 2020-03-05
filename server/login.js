'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

const bcrypt = require('bcrypt')

const auth = require('./auth')

router.post('/', (req, res) => {
    const {username, password} = req.body;

    const getUsername = db.prepare('SELECT * FROM User WHERE username = ?');

    db.serialize(() => {
        getUsername.get([username], (err, row) => {
            if (err) {
                res.status(500).json({"error":"Database error"})
                console.log(err)
                return
            }
    
            if (row === undefined) {
                res.status(404).json({"error":"Wrong username or password."})
                return
            }
    
            bcrypt.compare(password, row.password, (err, equal) => {
                if (equal) {
                    auth.authenticate(req, row.id, row.username)
                    res.status(200).json({
                        authenticated: true,
                        user: {
                            id: row.id,
                            username: row.username
                        }
                    })
                    return
                } else {
                    res.status(404).json({"error":"Wrong username or password."})
                    return
                }
            })
        })
        getUsername.finalize();
    })
})

router.get('/isAuth', (req, res) => {
    const user = req.session.user

    res.status(user ? 200 : 403).json({
        authenticated: user ? true : false,
        user: {
            id: user ? user.id : "",
            username: user ? user.username : ""
        }
    })
})

module.exports = router