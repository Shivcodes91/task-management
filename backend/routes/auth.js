const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");

const router = express.Router();

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role || "member"],
      function (err) {
        if (err) {
          return res.status(400).json({ error: "Email already exists" });
        }

        res.json({ message: "User created", id: this.lastID });
      }
    );
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );

      res.json({ token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

module.exports = router;