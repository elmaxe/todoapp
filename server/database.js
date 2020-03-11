const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);
//THIS LINE MAKES ON DELETE CASCADE WORK
db.exec("PRAGMA foreign_keys=ON")

// Auto increment automatically increments the id entry, there is no need to supply it a value.
const userTable = 'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, regDate TEXT)';
const todoTable = 'CREATE TABLE IF NOT EXISTS Todos (id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, \
                    title TEXT, description TEXT, date TEXT, FOREIGN KEY(userID) REFERENCES \
                    User(id) ON DELETE CASCADE)'; 

db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS User');
    // db.run('DROP TABLE IF EXISTS Todos');
    db.run(userTable);
    db.run(todoTable);

    // DEBUG
    // const hej = db.prepare('INSERT INTO User (username) VALUES (?)');
    // hej.run(["Sara"]);
    // hej.finalize();

    // const st = db.prepare('INSERT INTO Todos (title, description, date) VALUES (?, ?, ?)');
    // st.run(["Gör saker", "Ska göra det här: [insert lista]", "2020-03-03"]);
    // st.finalize();
});

module.exports = db;
