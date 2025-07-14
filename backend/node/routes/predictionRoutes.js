import express from "express";
import { authenticateToken } from "../middleware.js";
import {
  demo,
  getHistory,
  getPrediction,
  getScanData,
} from "../contollers/predictionController.js";

const predictionRouter = express.Router();

predictionRouter.post("/predict", authenticateToken, getPrediction);
predictionRouter.get("/history", authenticateToken, getHistory);
predictionRouter.get("/:scanId", authenticateToken, getScanData);
predictionRouter.post("/demo-scan", demo);

export default predictionRouter;
