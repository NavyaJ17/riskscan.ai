import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import { errorHandler } from "./middleware.js";
import cookieParser from "cookie-parser";
import predictionRouter from "./routes/predictionRoutes.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", predictionRouter);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
