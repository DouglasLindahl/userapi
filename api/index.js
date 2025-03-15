const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // ✅ Middleware to parse JSON

const playersFilePath = process.env.VERCEL
  ? "/tmp/players.txt"
  : path.join(__dirname, "players.txt");

// Endpoint to save JSON data into players.txt
app.post("/upload", (req, res) => {
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

app.get("/players", (req, res) => {
  fs.readFile(playersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading file:", err);
      return res
        .status(500)
        .json({ message: "Error reading data", error: err.message });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("❌ Error parsing JSON:", parseError);
      res.status(500).json({
        message: "Error parsing JSON data",
        error: parseError.message,
      });
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

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// ✅ Required for Vercel
module.exports = app;
