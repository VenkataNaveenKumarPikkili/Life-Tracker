import express from "express";
import { listTasks, addTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ service: "task", status: "ok" });
});

router.get("/list", listTasks);
router.post("/add", addTask);

export default router;
