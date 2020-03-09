'use strict'

var express = require('express')
// var router = express.Router()
const db = require('./database');

const authenticate = (req, id, username, registrationDate) => {
    if (!req.session.user) {
        console.log("CREATE NEW SESSION")
        req.session.user = {
            id,
            username,
            registrationDate
        }
    } else {
        console.log("ALREADY HAS A SESSION")
        console.log(req.session)
    }
}

exports.authenticate = authenticate;