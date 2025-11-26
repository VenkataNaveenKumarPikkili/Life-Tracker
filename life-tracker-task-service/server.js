import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 8002;

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "task", status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Task Service running at http://localhost:${PORT}`);
});
