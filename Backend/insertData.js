const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Error:", err));

// Define a test schema and model
const TestSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model("test", TestSchema);

async function insertData() {
    await TestModel.create({ name: "Test Entry" });
    console.log("✅ Data Inserted Successfully");
    mongoose.connection.close();
}

insertData();
