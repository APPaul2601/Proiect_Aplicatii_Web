const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/castle", require("./routes/castleRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/upgrades", require("./routes/upgradeRoutes"));
app.use("/api/shop", require("./routes/shopRoutes"));

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
});
