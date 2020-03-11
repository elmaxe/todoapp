'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

const bcrypt = require('bcrypt')

const auth = require('./auth')

const {saltRounds} = require('./register')

const hasUsername = (req, res, next) => {
    const {username} = req.body

    if (!username) {
        res.status(400).json({"error":"No username provided."})
        return
    }
    next()
}

const hasPassword = (req, res, next) => {
    const {password} = req.body

    if (!password) {
        res.status(400).json({"error":"No password provided."})
        return
    }
    next()
}

router.post('/', hasUsername, hasPassword, (req, res) => {
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
                    auth.authenticate(req, row.id, row.username, row.regDate)
                    res.status(200).json({
                        authenticated: true,
                        user: {
                            id: row.id,
                            username: row.username,
                            registrationDate: row.regDate
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
            username: user ? user.username : "",
            registrationDate: user ? user.registrationDate : ""
        }
    })
})

router.post('/changepassword', hasPassword, (req, res) => {
    const {password} = req.body
    const user = req.session.user

    if (!user) {
        res.status(403).json({"error":"Session expired"})
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

router.get('/removeaccount', (req, res) => {
    const user = req.session.user

    if (!user) {
        res.status(403).json({"error":"Session expired"})
        return
    }

    db.run('DELETE FROM User WHERE id = ?', [user.id], function(err) {
        if (err) {
            res.status(500).json({"error":"Database error"})
            console.log(err)
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Account removed along with user data"})
        } else {
            res.status(404).json({"error":"No user found, no user removed"})
        }
    })
})

module.exports = router