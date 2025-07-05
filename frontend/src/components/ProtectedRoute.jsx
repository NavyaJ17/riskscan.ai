import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
