'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

router.get('/', (req, res) => {
    res.status(404)
})

module.exports = router