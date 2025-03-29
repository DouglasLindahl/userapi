const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, "../users.json");
const countriesFilePath = path.join(__dirname, "../countries.json");
const teamsFilePath = path.join(__dirname, "../teams.json");
const typesFilePath = path.join(__dirname, "../types.json");
const leaguesFilePath = path.join(__dirname, "../leagues.json");

// Helper function to read users from users.json
const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

const getCountries = () => {
  try {
    const data = fs.readFileSync(countriesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

const getTeams = () => {
  try {
    const data = fs.readFileSync(teamsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

const getTypes = () => {
  try {
    const data = fs.readFileSync(typesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

const getLeagues = () => {
  try {
    const data = fs.readFileSync(leaguesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

// Get all users
app.get("/api/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get("/api/countries", (req, res) => {
  const countries = getCountries();
  res.json(countries);
});

app.get("/api/teams", (req, res) => {
  const teams = getTeams();
  res.json(teams);
});

app.get("/api/types", (req, res) => {
  const types = getTypes();
  res.json(types);
});

app.get("/api/leagues", (req, res) => {
  const leagues = getLeagues();
  res.json(leagues);
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
