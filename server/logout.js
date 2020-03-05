'use strict'

var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    const user = req.session.user

    if (user) {

        req.session.destroy()
        res.status(200).json({"status":"Logged out"})
    } else {
        res.status(403).json({"error":"Invalid cookie"})
    }
})

module.exports = router