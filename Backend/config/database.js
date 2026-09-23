const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const databasePath = path.join(
  __dirname,
  "..",
  "database.sqlite"
);

const db = new sqlite3.Database(
  databasePath,
  (error) => {

    if (error) {
      console.error(
        "SQLite connection error:",
        error.message
      );
    } else {
      console.log(
        "SQLite Database Connected ✅"
      );
    }

  }
);

db.serialize(() => {

  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      institute_code TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `,
    (error) => {

      if (error) {
        console.error(
          "Users table error:",
          error.message
        );
      } else {
        console.log(
          "Users table ready ✅"
        );
      }

    }
  );

});

module.exports = db;