const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Noel Carlfalk",
    email: "noel@carlfalk.se",
    phone: "123-456-7890",
    favoriteSport: "football",
    minHeight: "190",
    maxHeight: "195",
    minWeight: "72",
    maxWeight: "80",
    minAge: "28",
    maxAge: "36",
    gender: "male",
    position: "",
    nationality: "english",
    league: "",
  },
  {
    id: 2,
    name: "Douglas Lindahl",
    email: "douglas.lindahl@gmail.com",
    phone: "987-654-3210",
    favoriteSport: "football",
    minHeight: "190",
    maxHeight: "195",
    minWeight: "72",
    maxWeight: "80",
    minAge: "28",
    maxAge: "36",
    gender: "male",
    position: "",
    nationality: "english",
    league: "",
  },
];

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Add a new user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favoriteSport: req.body.favoriteSport,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all players from players.txt
app.get("/api/players", (req, res) => {
  const filePath = path.join(__dirname, "../players.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading players file" });
    }
    try {
      const players = JSON.parse(data);
      res.json(players);
    } catch (parseError) {
      res.status(500).json({ message: "Error parsing players file" });
    }
  });
});

// Vercel requires a function export
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
} else {
  module.exports = app;
}
