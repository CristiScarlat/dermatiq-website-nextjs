const sqlite3 = require("sqlite3").verbose();
import path from 'path';

export const getUsers = async () => {
    const dbFile = path.join(process.cwd(), "dermatiqDB.db");
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        const users = await new Promise((resolve, reject) => db.all("SELECT * FROM users;", (err, row) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(row);
        }))
        db.close();
        return users;
    }
}

export const addUser = async (username, password) => {
    const dbFile = path.join(process.cwd(), "dermatiqDB.db");
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        await new Promise((resolve, reject) => {
            db.exec (`INSERT INTO users (username, password)
                VALUES ("${username}", "${password}");`, (err, row) => {
                if (err) {
                    return reject(err);
                }
                return resolve(row);
            })
        })
        db.close();
    }
}

export const findUser = async (username) => {
    const dbFile = path.join(process.cwd(), "dermatiqDB.db");
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        const user = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE username="${username}";`, (err, row) => {
                if (err) {
                    return reject(err);
                }
                return resolve(row);
            })
        })
        db.close();
        return user;
    }
}