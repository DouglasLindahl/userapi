const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, "data.txt");

app.use(express.json()); // Middleware to parse JSON

// API to write data to a text file
app.post("/write", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "No content provided" });
  }

  fs.appendFile(FILE_PATH, content + "\n", (err) => {
    if (err) {
      return res.status(500).json({ message: "Error writing to file" });
    }
    res.json({ message: "Data written successfully" });
  });
});

// API to read data from the text file
app.get("/read", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    return res.json({ message: "File is empty or does not exist" });
  }

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }
    res.json({ content: data });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
