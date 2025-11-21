const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file!");
    process.exit(1);
  }

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));
};

module.exports = connectDatabase;