'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

const bcrypt = require('bcrypt')

const auth = require('./auth')

const {saltRounds} = require('./register')

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

router.post('/changepassword', (req, res) => {
    const {password} = req.body
    const user = req.session.user

    if (!user) {
        res.status(403).json({"error":"Not logged in"})
        return
    }

    const getUser = db.prepare('SELECT * FROM User WHERE id = ?', [user.id])
    const changePassword = db.prepare('UPDATE User SET password = ? WHERE id = ?')

    getUser.get((err, row) => {
        if (err) {
            res.status(500).json({"error":"Database error"})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"Couldn't find user"})
            return
        }

        bcrypt.compare(password, row.password, (err, equal) => {
            if (err) {
                res.status(500).json({"error":"Hash error"})
                return
            }

            if (equal) {
                res.status(403).json({"error":"New password can't be the same as the old one."})
                return
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        res.status(500).json({"error":"Hash error"})
                        return
                    }
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            res.status(500).json({"error":"Hash error"})
                            return
                        }
                        changePassword.run([hash, row.id])
                        changePassword.finalize()
                        res.status(200).json({"status":"Password changed"})
                    })
                })
            }
        })

    })
    getUser.finalize()

})

module.exports = router