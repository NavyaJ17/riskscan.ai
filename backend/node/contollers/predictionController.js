import axios from "axios";
import userModel from "../models/userModel.js";
import "dotenv/config";

export const getPrediction = async (req, res, next) => {
  const { api_url } = req.body;
  try {
    const response = await axios.post(`${process.env.PYTHON_URL}/predict`, {
      api_url,
    });

    const { stats, prediction } = response.data;

    const user = await userModel.findById(req.userId);

    if (!user) {
      return next({ status: 404, message: "User not found." });
    }
    user.history.push({
      url: api_url,
      total_endpoints: stats.total_endpoints,
      mean_risk_score: stats.mean_risk_score,
      average_risk_category: stats.average_risk_category,
      predictions: prediction,
    });
    await user.save();

    const scanId = user.history[user.history.length - 1]._id;

    return res.status(200).json({
      success: true,
      scanId,
    });
  } catch (error) {
    next(error);
  }
};

export const getScanData = async (req, res, next) => {
  const { scanId } = req.params;
  try {
    const user = await userModel.findOne({ "history._id": scanId });

    if (!user) {
      return next({ status: 404, message: "Scan not found." });
    }

    const prediction = user.history.id(scanId);

    if (!prediction) {
      return next({ status: 404, message: "Scan result not found." });
    }

    return res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    next(error);
  }
};

export const demo = async (req, res, next) => {
  const { api_url } = req.body;
  try {
    const response = await axios.post(`${process.env.PYTHON_URL}/predict`, {
      api_url,
    });

    const { stats, prediction } = response.data;

    return res.status(200).json({
      success: true,
      stats,
      prediction: prediction[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return next({ status: 404, message: "User not found." });
    }
    return res.status(200).json({ success: true, history: user.history });
  } catch (error) {
    return next(error);
  }
};
