const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/mensajes.db');

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS mensajes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha TEXT,
            nombre TEXT,
            edad INTEGER,
            email TEXT,
            mensaje TEXT
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT UNIQUE,
            password TEXT
        )
    `);

});

module.exports = db;