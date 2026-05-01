const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Create Project (Admin only)
router.post("/", auth, role("admin"), (req, res) => {
   console.log("USER:", req.user); // 👈 ADD THIS

  const { name } = req.body;

  const result = db
    .prepare("INSERT INTO projects (name,created_by) VALUES (?,?)")
    .run(name, req.user.id);

  res.json({ id: result.lastInsertRowid });
});

// Get Projects
router.get("/", auth, (req, res) => {
  const projects = db.prepare("SELECT * FROM projects").all();
  res.json(projects);
});

// Add member
router.post("/:id/add-member", auth, role("admin"), (req, res) => {
  const { userId } = req.body;

  db.prepare(
    "INSERT INTO project_members (project_id,user_id) VALUES (?,?)"
  ).run(req.params.id, userId);

  res.json({ message: "Member added" });
});

module.exports = router;