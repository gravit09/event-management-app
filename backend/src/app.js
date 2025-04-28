const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/users", userRoutes);
app.use("/api/events", auth, eventRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
