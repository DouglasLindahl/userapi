const express = require("express");

const app = express();
app.use(express.json());

// ✅ Import API routes
const apiRoutes = require("./api/index");

// ✅ Use API routes under "/api"
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
