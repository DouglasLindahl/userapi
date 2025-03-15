const express = require("express");
const app = express();
const apiRoutes = require("./api/index"); // ✅ Import routes

app.use(express.json()); // ✅ Enable JSON body parsing
app.use("/api", apiRoutes); // ✅ Fix: Mount under `/api`

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
