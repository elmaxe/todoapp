const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);

// Auto increment automatically increments the id entry, there is no need to supply it a value.
const userTable = 'CREATE TABLE User (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)';

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS User');
    db.run(userTable);

    const st = db.prepare('INSERT INTO User (username, password) VALUES (?, ?)')
    st.run(["sara", "hej1234"])
});

module.exports = db;