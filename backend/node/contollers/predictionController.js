import axios from "axios";
import userModel from "../models/userModel.js";

export const getPrediction = async (req, res, next) => {
  const { api_url} = req.body;
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      api_url
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

    return res.status(200).json({
      success: true,
      stats,
      prediction,
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
