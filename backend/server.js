import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import jobsRoutes from "./routes/jobs.js";
import helmet from "helmet";
import connectDB from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes); // Protected jobs routes
app.get("/", (req, res) => {
  res.send("Job board Backend");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Nodejs Server is running on port ${PORT}`);
});
