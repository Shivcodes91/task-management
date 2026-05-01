const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// ---------------- CREATE PROJECT (Admin only) ----------------
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    await db.read();

    console.log("USER:", req.user);

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Project name required" });
    }

    const newProject = {
      id: Date.now(),
      name,
      created_by: req.user.id
    };

    db.data.projects.push(newProject);
    await db.write();

    res.json(newProject);

  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ---------------- GET PROJECTS ----------------
router.get("/", auth, async (req, res) => {
  try {
    await db.read();
    res.json(db.data.projects);
  } catch (err) {
    console.error("Fetch projects error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ---------------- ADD MEMBER ----------------
router.post("/:id/add-member", auth, role("admin"), async (req, res) => {
  try {
    await db.read();

    const { userId } = req.body;
    const projectId = Number(req.params.id);

    const newMember = {
      id: Date.now(),
      project_id: projectId,
      user_id: userId
    };

    db.data.project_members.push(newMember);
    await db.write();

    res.json({ message: "Member added" });

  } catch (err) {
    console.error("Add member error:", err);
    res.status(500).json({ error: "Failed to add member" });
  }
});

module.exports = router;