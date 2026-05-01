const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");

const router = express.Router();

// ---------------- CREATE TASK ----------------
router.post("/", auth, (req, res) => {
  const { title, description, project_id, assigned_to, due_date } = req.body;

  db.run(
    `INSERT INTO tasks (title, description, project_id, assigned_to, due_date)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, project_id, assigned_to, due_date],
    function (err) {
      if (err) {
        console.error("Create task error:", err);
        return res.status(500).json({ error: "Failed to create task" });
      }

      res.json({ id: this.lastID });
    }
  );
});

// ---------------- GET TASKS ----------------
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      console.error("Fetch tasks error:", err);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }

    res.json(rows);
  });
});

// ---------------- UPDATE TASK STATUS ----------------
router.patch("/:id", auth, (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, req.params.id],
    function (err) {
      if (err) {
        console.error("Update task error:", err);
        return res.status(500).json({ error: "Failed to update task" });
      }

      res.json({ message: "Updated" });
    }
  );
});

module.exports = router;