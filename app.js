const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app; // ✅ This line exports the Express app
