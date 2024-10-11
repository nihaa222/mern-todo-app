const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors());

const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

// API routes
app.use("/api/todos", todoRoutes);

// Serve the React app for any other request (for React Router support)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
