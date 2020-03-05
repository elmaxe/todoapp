'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

const bcrypt = require('bcrypt')

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
                    authenticate(req, row.id, row.username)
                    res.status(200).json({"status":"Login successful.", "token":"dwaluadhdha738y2hhr4"})
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

// const isAuthenticated = (req, res, next) => {

//     const user = req.session.user

//     res.status(200).json({
//         isAuthenticated: user ? true : false,
//         user: {
//             id: user ? user.id : "",
//             username: user ? user.username : ""
//         }
//     })

//     next();
// }

const authenticate = (req, id, username, next) => {
    req.session.user = {
        id,
        username
    }
    console.log(req.session)
}

module.exports = router