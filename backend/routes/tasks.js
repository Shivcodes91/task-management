const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");

const router = express.Router();

// Create task
router.post("/", auth, (req, res) => {
  const { title, description, project_id, assigned_to, due_date } =
    req.body;

  const result = db
    .prepare(
      "INSERT INTO tasks (title,description,project_id,assigned_to,due_date) VALUES (?,?,?,?,?)"
    )
    .run(title, description, project_id, assigned_to, due_date);

  res.json({ id: result.lastInsertRowid });
});

// Get tasks
router.get("/", auth, (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();
  res.json(tasks);
});

// Update status
router.patch("/:id", auth, (req, res) => {
  const { status } = req.body;

  db.prepare("UPDATE tasks SET status=? WHERE id=?").run(
    status,
    req.params.id
  );

  res.json({ message: "Updated" });
});

module.exports = router;