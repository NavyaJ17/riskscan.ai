import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return next({ status: 400, message: "Required details are missing." });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next({
        status: 409,
        message: "Account already exists. Please login to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'None',
      // secure: true
    });

    const { _id} = user._doc;

    return res.status(201).json({
      success: true,
      user: { _id, firstName, lastName, email },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ status: 400, message: "Required details are missing." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next({ status: 404, message: "Account does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({ status: 401, message: "Invalid email or password." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'None',
      // secure: true
    });

    const { _id, firstName, lastName } = user._doc;

    return res.status(200).json({
      success: true,
      user: { _id, firstName, lastName, email },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return next({ status: 401, message: "Unauthorized." });
  }

  const refreshToken = req.cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      if (error) {
        return next({ status: 403, message: "Forbidden." });
      }

      try {
        const user = await userModel.findById(decoded.userId);
        if (!user) {
          return next({ status: 404, message: "User not found." });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          // sameSite: 'None',
          // secure: true
        });

        return res
          .status(200)
          .json({ success: true, accessToken: newAccessToken });
      } catch (err) {
        next(err);
      }
    }
  );
};

export const logout = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return next({ statusCode: 400, message: "No token provided." });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      // sameSite: 'None',
      // secure: true
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    next(err);
  }
};
