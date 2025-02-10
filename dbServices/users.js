const sqlite3 = require("sqlite3").verbose();
import path from 'path';

const dbFile = path.join(process.cwd(), "dermatiqDB.db");

export const getUsers = async () => {
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

export const addUser = async (userData) => {
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        const user = await new Promise((resolve, reject) => {
            db.exec (`INSERT INTO users (username, password, role, email, fullname, phone)
                VALUES ("${userData.username}", "${userData.password}", "${userData.role}", "${userData.email}", "${userData.fullName}", "${userData.phone}")`, (err, row) => {
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

export const patchUser = async (userData) => {
    function getQuery() {
        //UPDATE users SET ${get} WHERE [condition];
        let vals = [];
        for (let key in userData) {
            if(key !== "id") vals.push(`${key} = "${userData[key]}"`);
        }

        console.log("....", `UPDATE users SET ${vals.join(', ')} WHERE id = ${userData.id}`);
        return `UPDATE users SET ${vals.join(', ')} WHERE id = ${userData.id}`;
    }
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db && userData?.id) {
        // Perform a database query to retrieve all items from the "items" table
        const user = await new Promise((resolve, reject) => {
            db.exec(`${getQuery()};`, (err, row) => {
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

export const findUser = async (username) => {
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

export const deleteUser = async (userId) => {
    // If the database instance is not initialized, open the database connection
    const db = new sqlite3.Database(dbFile);
    if (db) {
        // Perform a database query to retrieve all items from the "items" table
        await new Promise((resolve, reject) => {
            db.exec(`DELETE from users where id=${userId};`, (err, row) => {
                if (err) {
                    return reject(err);
                }
                return resolve(row);
            })
        })
        db.close();
        return userId;
    }
}