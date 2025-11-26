import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Root route test
app.get("/", (req, res) => res.send("API Gateway Running 🚀"));

// ---------------- HABIT SERVICE ROUTES ---------------- //
app.use("/api/habits", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
}));

app.use("/api/habits/toggle", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
}));

app.use("/api/habits/delete", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
}));

app.use("/api/habits/add", createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
}));

// ------------------------------------------------------- //

app.listen(8000, () =>
    console.log("🚀 API Gateway Live on http://localhost:8000")
);
