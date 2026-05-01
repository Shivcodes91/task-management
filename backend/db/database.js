const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ Connected to SQLite DB");

    // USERS
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'member'
      )
    `);

    // PROJECTS
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_by INTEGER
      )
    `);

    // TASKS
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        status TEXT DEFAULT 'todo',
        project_id INTEGER,
        assigned_to INTEGER,
        due_date TEXT
      )
    `);
  }
});

module.exports = db;