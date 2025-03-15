const express = require("express");

const app = express();
app.use(express.json());

const apiRoutes = require("./api/index");
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Debug: Log the available routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`Route available: ${r.route.path}`);
  }
});

module.exports = app;
