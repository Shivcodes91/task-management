const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("database.json");

// ✅ Provide default data HERE (important)
const db = new Low(adapter, {
  users: [],
  projects: [],
  tasks: [],
  project_members: []
});

async function initDB() {
  await db.read();
  await db.write();

  console.log("✅ JSON DB Ready");
}

initDB();

module.exports = db;