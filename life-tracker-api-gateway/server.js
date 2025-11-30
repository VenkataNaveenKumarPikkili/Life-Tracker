// api-gateway/server.js
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // <-- correct for your frontend
    credentials: true
}));

// ----- AUTH SERVICE (Spring Boot) -----
app.use("/api/auth", createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/api/auth" }
}));

// ----- HABITS -----
app.use("/api/habits", createProxyMiddleware({ target: "http://localhost:8001", changeOrigin: true }));

// ----- TASKS -----
app.use("/api/todos", createProxyMiddleware({ target: "http://localhost:8002", changeOrigin: true }));

app.listen(8000, () => console.log("🚀 API Gateway on http://localhost:8000"));
