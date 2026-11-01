import express from "express";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/projects", projectRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Portfolio API is running!",
  });
});

export default app;
