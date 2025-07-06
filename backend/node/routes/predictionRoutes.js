import express from "express";
import { authenticateToken } from "../middleware.js";
import {
  demo,
  getHistory,
  getPrediction,
} from "../contollers/predictionController.js";

const predictionRouter = express.Router();

predictionRouter.post("/predict", authenticateToken, getPrediction);
predictionRouter.post("/demo-scan", demo);
predictionRouter.get("/history", authenticateToken, getHistory);

export default predictionRouter;
