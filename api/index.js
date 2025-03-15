const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const playersFilePath = "tmp/players.txt"; // ✅ Use Vercel-compatible path

// Endpoint to save JSON data into players.txt
router.post("/upload", (req, res) => {
  console.log("Incoming Data:", req.body); // ✅ Debugging log

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Invalid or empty JSON data" });
  }

  const dataString = JSON.stringify(req.body, null, 2);

  fs.writeFile(playersFilePath, dataString, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ message: "Error saving data" });
    }
    res.status(200).json({ message: "Data saved successfully!" });
  });
});

// Endpoint to read and return the contents of players.txt
router.get("/players", (req, res) => {
  fs.readFile(playersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading data" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

const users = [
  {
    id: 1,
    name: "Noel Carlfalk",
    email: "noel@carlfalk.se",
    phone: "123-456-7890",
    favoriteSport: "football",
  },
  {
    id: 2,
    name: "Douglas Lindahl",
    email: "douglas.lindahl@gmail.com",
    phone: "987-654-3210",
    favoriteSport: "football",
  },
];

// Get all users
router.get("/users", (req, res) => {
  res.json(users);
});

// Get user by ID
router.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

module.exports = router;
