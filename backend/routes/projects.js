const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// ---------------- CREATE PROJECT (Admin only) ----------------
router.post("/", auth, role("admin"), (req, res) => {
  console.log("USER:", req.user);

  const { name } = req.body;

  db.run(
    "INSERT INTO projects (name, created_by) VALUES (?, ?)",
    [name, req.user.id],
    function (err) {
      if (err) {
        console.error("Create project error:", err);
        return res.status(500).json({ error: "Failed to create project" });
      }

      res.json({ id: this.lastID });
    }
  );
});

// ---------------- GET PROJECTS ----------------
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) {
      console.error("Fetch projects error:", err);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }

    res.json(rows);
  });
});

// ---------------- ADD MEMBER ----------------
router.post("/:id/add-member", auth, role("admin"), (req, res) => {
  const { userId } = req.body;

  db.run(
    "INSERT INTO project_members (project_id, user_id) VALUES (?, ?)",
    [req.params.id, userId],
    function (err) {
      if (err) {
        console.error("Add member error:", err);
        return res.status(500).json({ error: "Failed to add member" });
      }

      res.json({ message: "Member added" });
    }
  );
});

module.exports = router;