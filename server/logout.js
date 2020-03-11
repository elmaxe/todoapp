'use strict'

var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    const user = req.session.user

    if (user) {

        req.session.destroy()
        //TODO REMOVE FROM REDIS
        res.cookie('session', '1', { expires: new Date(Date.now() - 31536000000*100), httpOnly: true })
        res.status(200).json({"status":"Logged out"})
    } else {
        res.status(403).json({"error":"Session expired"})
    }
})

module.exports = router