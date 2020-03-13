'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(403).json({"error":"Session expired."})
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

            res.status(201).json({todos: rows});
        });
        load.finalize();
    })
})

router.post('/remove', (req, res) => {
    const id = req.body.id;
    const user = req.session.user;
    // console.log(req.body)
    // console.log(user)
    // console.log(id)

    const remove = db.prepare('DELETE FROM Todos WHERE id = ? AND userID = ?')
    const load = db.prepare('SELECT * FROM Todos WHERE userID = ?');

    db.serialize(() => {
        remove.run([id, user.id], function(err) {
            if (err) {
                res.status(500).json({"error":"Database error"})
                console.log(err)
                return
            }

            if (this.changes > 0) {
                load.all([user.id], (err, rows) => {
                    if (err) {
                        res.status(500).json({"error":"Database error"})
                        return
                    }
                    res.status(200).json({"status":"Removed todo", "todos":rows})
                })
            } else {
                load.all([user.id], (err, rows) => {
                    if (err) {
                        res.status(500).json({"error":"Database error"})
                        return
                    }
                    res.status(202).json({"status":"Todo not found, no todo removed", "todos":rows})
                })
            }
        })
        // db.run('DELETE FROM Todos WHERE id = ? AND userID = ?', [id, user.id], function(err) {
        //     if (err) {
        //         res.status(500).json({"error":"Database error"});
        //         console.log(err);
        //         return;
        //     }

        //     if (this.changes > 0) {
        //         res.status(200).json({"status":"Removed todo", "todos":abllva});
        //     } else {
        //         res.status(202).json({"status":"Todo not found, no todo removed"});
        //         console.log("Todo not found, no todo removed");
        //     }
        // });
    })
})

router.post('/update', (req, res) => {
    const {id, title, description, dueDate} = req.body;
    const user = req.session.user;

    const updateTodo = db.prepare('UPDATE Todos SET title = ?, description = ?, date = ? WHERE userID = ? AND id = ?');
    const load = db.prepare('SELECT * FROM Todos WHERE userID = ?');
    db.serialize(() => {
        updateTodo.run([title, description, dueDate, user.id, id]);
        updateTodo.finalize();

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

module.exports = router
