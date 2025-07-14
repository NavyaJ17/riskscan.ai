import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    trim: true,
  },
  method: {
    type: String,
    trim: true,
  },
  alertname: {
    type: [String],
    trim: true,
  },
  desc: {
    type: [String],
    trim: true,
  },
  solution: {
    type: [String],
    trim: true,
  },
  risk_category: {
    type: String,
    trim: true,
  },
  predicted_risk_score: {
    type: Number,
  },
});

const historySchema = new mongoose.Schema({
  url: {
    type: String,
    trim: true,
  },
  total_endpoints: {
    type: Number,
  },
  mean_risk_score: {
    type: Number,
  },
  average_risk_category: {
    type: String,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  predictions: [predictionSchema],
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  history: [historySchema],
});

let userModel = mongoose.model("user", userSchema);
export default userModel;
