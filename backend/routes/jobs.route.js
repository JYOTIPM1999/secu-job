import express from "express";
import Job from "../models/Job.model.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware); // Protect all job routes

// Create Job (Employer only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer")
    return res.status(403).json({ msg: "Unauthorized" });
  try {
    const job = await Job.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Job (Employer only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });
    await job.remove();
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
