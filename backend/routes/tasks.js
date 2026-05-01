const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");

const router = express.Router();

// ---------------- CREATE TASK ----------------
router.post("/", auth, async (req, res) => {
  try {
    await db.read();

    const { title, description, project_id, assigned_to, due_date } = req.body;

    if (!title || !project_id) {
      return res.status(400).json({ error: "Title and Project ID required" });
    }

    const newTask = {
      id: Date.now(),
      title,
      description: description || "",
      project_id: Number(project_id),
      assigned_to: assigned_to ? Number(assigned_to) : null,
      due_date: due_date || null,
      status: "todo"
    };

    db.data.tasks.push(newTask);
    await db.write();

    res.json(newTask);

  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ---------------- GET TASKS ----------------
router.get("/", auth, async (req, res) => {
  try {
    await db.read();
    res.json(db.data.tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ---------------- UPDATE TASK STATUS ----------------
router.patch("/:id", auth, async (req, res) => {
  try {
    await db.read();

    const taskId = Number(req.params.id);
    const { status } = req.body;

    const task = db.data.tasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.status = status || task.status;

    await db.write();

    res.json({ message: "Updated", task });

  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

module.exports = router;