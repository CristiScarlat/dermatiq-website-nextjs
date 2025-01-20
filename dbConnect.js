const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = path.join(process.cwd(), "dermatiqDB.db");
// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
    dbFile,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL
            )`, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("Table created successfully.");
    });

});
db.close();
