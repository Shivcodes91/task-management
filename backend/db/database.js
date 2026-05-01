const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("database.json");
const db = new Low(adapter);

// Initialize DB
async function initDB() {
  await db.read();

  db.data ||= {
    users: [],
    projects: [],
    tasks: [],
    project_members: []
  };

  await db.write();

  console.log("✅ JSON DB Ready");
}

initDB();

module.exports = db;