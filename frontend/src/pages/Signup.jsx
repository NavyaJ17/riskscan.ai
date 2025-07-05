import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const lastName = useRef();
  const { setIsLoggedIn, setUserData, setAccessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setShowPassword(!showPassword);
  }
  function validateName(value) {
    setNameError(value === "");
  }
  function validateEmail(value) {
    if (value === "") {
      setEmailError("*Required");
    } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("*Please enter a valid email");
    } else {
      setEmailError(false);
    }
  }
  function validatePassword(value) {
    if (value === "") {
      setPasswordError("*Required");
    } else if (!value.match(/^.{8,}$/)) {
      setPasswordError("*Password must be atleast 8 characters");
    } else {
      setPasswordError(false);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post("/api/register", {
        firstName: firstName,
        lastName: lastName.current.value,
        email: email,
        password: password,
      });
      setIsLoggedIn(res.data.success);
      setUserData(res.data.user);
      setAccessToken(res.data.accessToken);
      toast.success("Logged in successfully!");
      setLoading(false);
      navigate(`/${res.data.user._id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="sm:border sm:p-20 rounded-xl sm:min-w-2xl p-6 bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-bold text-white">Create an account</h1>
        <p className="mb-10 text-gray-600">
          Create your account to get started
        </p>
        <form
          className="flex flex-col items-center justify-center gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <div
              className={`p-3 px-4 border rounded-full flex flex-row gap-2 bg-white/5 ${
                nameError ? "border-red-500" : "border-white/15"
              } ${
                nameError
                  ? "ring-3 ring-red-500/40"
                  : "focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500"
              }`}
            >
              <i className="flex justify-center items-center bi bi-person text-gray-400 text-xl"></i>
              <input
                className="focus:outline-0 w-full text-base font-medium text-gray-500 disabled:cursor-not-allowed"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                disabled={loading}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateName(e.target.value);
                }}
              />
            </div>
            {nameError ? (
              <p className="ml-3 text-xs text-red-500 mt-1">*Required</p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="p-3 px-4 border border-white/15 rounded-full w-full flex flex-row gap-2 bg-white/5 focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500">
            <i className="flex justify-center items-center bi bi-person-vcard text-gray-400 text-xl"></i>
            <input
              className="focus:outline-0 w-full text-base font-medium text-gray-500 disabled:cursor-not-allowed"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              disabled={loading}
              ref={lastName}
            />
          </div>
          <div className="w-full">
            <div
              className={`p-3 px-4 border rounded-full flex flex-row gap-2 bg-white/5 ${
                emailError ? "border-red-500" : "border-white/15"
              } ${
                emailError
                  ? "ring-3 ring-red-500/40"
                  : "focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500"
              }`}
            >
              <i className="flex justify-center items-center bi bi-envelope text-gray-400 text-xl"></i>
              <input
                className="focus:outline-0 w-full text-base font-medium text-gray-500 disabled:cursor-not-allowed"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
            </div>
            {emailError ? (
              <p className="ml-3 text-xs text-red-500 mt-1">{emailError}</p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="w-full">
            <div
              className={`p-3 px-4 border rounded-full flex flex-row gap-2 bg-white/5 ${
                passwordError ? "border-red-500" : "border-white/15"
              } ${
                passwordError
                  ? "ring-3 ring-red-500/40"
                  : "focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500"
              }`}
            >
              <i className="flex justify-center items-center bi bi-lock text-gray-400 text-xl"></i>
              <input
                className="focus:outline-0 w-full text-base font-medium text-gray-500 disabled:cursor-not-allowed"
                type={!showPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                disabled={loading}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              {showPassword ? (
                <i
                  className="flex justify-center items-center bi bi-eye hover:cursor-pointer text-gray-400 hover:text-blue-500 transition text-xl"
                  onClick={handleClick}
                ></i>
              ) : (
                <i
                  className="flex justify-center items-center bi bi-eye-slash hover:cursor-pointer text-gray-400 hover:text-blue-500 transition text-xl"
                  onClick={handleClick}
                ></i>
              )}
            </div>
            {passwordError ? (
              <p className="ml-3 text-xs text-red-500 mt-1">{passwordError}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
              disabled={
                nameError ||
                emailError ||
                passwordError ||
                firstName === "" ||
                email === "" ||
                password === ""
              }
            >
              {loading ? <ClipLoader color="white" size={15} /> : "Sign Up"}
            </button>
            <p className="ml-3 mt-1 text-sm text-gray-300">
              Already have an account?{" "}
              <span className="text-blue-500 underline">
                <Link to={"/login"}>Login here</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
