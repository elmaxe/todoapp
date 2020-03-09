'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(403).json({"error":"Not logged in"})
    }
})

router.get('/get', (req, res) => {
    const user = req.session.user;
    const getTodos = db.prepare('SELECT * FROM Todos WHERE userID = ?');
    db.serialize(() => {
        getTodos.all([user.id], (err, rows) => {
            if (err) {
                res.status(500).json({"error":"Database error"})
                console.log(err)
                return
            }

            res.status(200).json({todos: rows});
        })
        getTodos.finalize();
    })
})

router.post('/add', (req, res) => {
    const {title, description, dueDate} = req.body;
    const user = req.session.user;

    const addTodo = db.prepare('INSERT INTO Todos (userID, title, description, date) VALUES (?, ?, ?, ?)');
    const load = db.prepare('SELECT * FROM Todos WHERE userID = ?');
    db.serialize(() => {
        addTodo.run([user.id, title, description, dueDate]);
        addTodo.finalize();

        load.all([user.id], (err, rows) => {
            if (err) {
                res.status(500).json({"error":"Database error"});
                console.log(err);
                return;
            }

            res.status(200).json({todos: rows});
        });
        load.finalize();
    })
})

router.post('/remove', (req, res) => {
    const todoID = req.body.id;
    const user = req.session.user;
    console.log(req.body)
    console.log(user)

    db.serialize(() => {
        db.run('DELETE FROM Todos WHERE id = ? AND userID = ?', [todoID, user.id], function(err) {
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
