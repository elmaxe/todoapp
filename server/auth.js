'use strict'

var express = require('express')
// var router = express.Router()
const db = require('./database');

const isAuthenticated = (req, res, next) => {

    const user = req.session.user

    res.status(200).json({
        isAuthenticated: user ? true : false,
        user: {
            id: user ? user.id : "",
            username: user ? user.username : ""
        }
    })

    next();
}

const authenticate = (req, id, username) => {
    req.session.user = {
        id,
        username
    }
    console.log(req.session)
}

exports.authenticate = authenticate;
exports.isAuthenticated = isAuthenticated

// module.exports = router;