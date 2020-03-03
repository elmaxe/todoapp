'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

router.get('/', (req, res) => {
    const {userID} = req.body;

    const getTodos = db.prepare('SELECT * FROM Todos'); // WHERE userID = ?');
    db.serialize(() => {
        getTodos.all([userID], (err, rows) => {
            if (err) {
                res.status(500).json({"error":"Database error"})
                console.log(err)
                return
            }

            res.status(200).json({rows});
        })
        getTodos.finalize();
    })
})

router.post('/', (req, res) => {

})

module.exports = router
