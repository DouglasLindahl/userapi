const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();
app.use(express.json());

const sports = [
  "Soccer",
  "Basketball",
  "Tennis",
  "Cricket",
  "Baseball",
  "Hockey",
  "Swimming",
  "Running",
];

// Generate fake users
let users = Array.from({ length: 10 }, (_, id) => ({
  id: id + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  favoriteSport: sports[Math.floor(Math.random() * sports.length)],
}));

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
    name: req.body.name || faker.person.fullName(),
    email: req.body.email || faker.internet.email(),
    phone: req.body.phone || faker.phone.number(),
    favoriteSport:
      req.body.favoriteSport ||
      sports[Math.floor(Math.random() * sports.length)],
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = app;
