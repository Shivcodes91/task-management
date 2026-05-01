const Database = require("better-sqlite3");

const db = new Database("database.db");

// USERS
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT CHECK(role IN ('admin','member'))
)
`).run();

// PROJECTS
db.prepare(`
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  created_by INTEGER
)
`).run();

// PROJECT MEMBERS
db.prepare(`
CREATE TABLE IF NOT EXISTS project_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER,
  user_id INTEGER
)
`).run();

// TASKS
db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  project_id INTEGER,
  assigned_to INTEGER,
  status TEXT DEFAULT 'todo',
  due_date TEXT
)
`).run();

module.exports = db;