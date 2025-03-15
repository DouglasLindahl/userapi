const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const playersFilePath = process.env.VERCEL
  ? "/tmp/players.txt"
  : path.join(__dirname, "players.txt");

// ✅ Ensure file exists on startup
if (!fs.existsSync(playersFilePath)) {
  console.log("📁 Creating players.txt since it doesn't exist...");
  fs.writeFileSync(playersFilePath, "[]", "utf8"); // Start with an empty JSON array
}

// ✅ Import and use API routes
const apiRoutes = require("./api/index");
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
