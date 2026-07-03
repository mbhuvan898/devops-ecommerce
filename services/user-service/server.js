require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const connectDatabase = require("./config/database");

mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 4001;

process.on("uncaughtException", (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

connectDatabase();

const server = app.listen(PORT, () => {
  console.log(`✅ user-service running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
