const express = require("express");

const app = express();
app.use(express.json());

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
    favoriteSport: "Basketball",
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

module.exports = app;
