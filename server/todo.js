'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

router.get('/get', (req, res) => {
    const {userID} = req.body;
    console.log(req.session)
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

router.post('/add', (req, res) => {
    const {userID, title, description, dueDate} = req.body;

    const addTodo = db.prepare('INSERT INTO Todos (userID, title, description, date) VALUES (?, ?, ?, ?)');
    const load = db.prepare('SELECT * FROM Todos'); // WHERE userID = ?');
    db.serialize(() => {
        addTodo.run([userID, title, description, dueDate]);
        addTodo.finalize();

        load.all((err, rows) => {
            if (err) {
                res.status(500).json({"error":"Database error"});
                console.log(err);
                return;
            }

            res.status(200).json({rows});
        });
        load.finalize();
    })
})

router.post('/remove', (req, res) => {
    const {id, userID} = req.body;

    db.serialize(() => {
        db.run('DELETE FROM Todos WHERE id = ? AND userID = ?', [id, userID], function(err) {
            if (err) {
                res.status(500).json({"error":"Database error"});
                console.log(err);
                return;
            }
            if (this.changes > 0) {
                res.status(200).json({"status":"Removed todo"});
            } else {
                res.status(202).json({"status":"Todo not found, no todo removed"});
                console.log("Todo not found, no todo removed");
            }
        });
    })
})

module.exports = router
