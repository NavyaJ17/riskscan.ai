import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setIsLoggedIn, setUserData, setAccessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setShowPassword(!showPassword);
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
    setPasswordError(value === "");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      console.log(res);
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
    <div className="min-h-screen min-w-screen sm:min-h-auto sm:border sm:p-10 sm:rounded-2xl sm:min-w-2xl p-4 bg-gray-950 flex items-center justify-center outline outline-white/10">
      <div className="flex flex-col justify-center items-center w-full">
        <Link to={"/"}>
          <div className="flex flex-col text-white items-center gap-2 text-xl font-bold font-outfit mb-10">
            <svg
              id="logo-71"
              width="43"
              height="48"
              viewBox="0 0 44 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.2 8.04745C23.2 6.96404 22.9478 5.89551 22.4632 4.92647C22.0444 4.08884 21.7985 3.17549 21.7401 2.24081L21.6 0L21.46 2.24073C21.4015 3.17542 21.1556 4.0888 20.7368 4.92644C20.2523 5.8955 20 6.96406 20 8.04749V39.9525C20 41.0359 20.2523 42.1045 20.7368 43.0736C21.1556 43.9112 21.4015 44.8246 21.46 45.7593L21.6 48L21.7401 45.7592C21.7985 44.8245 22.0444 43.9112 22.4632 43.0735C22.9478 42.1045 23.2 41.036 23.2 39.9525V8.04745ZM14.4632 8.12647C14.9478 9.09551 15.2 10.1641 15.2 11.2475V36.7525C15.2 37.836 14.9478 38.9045 14.4632 39.8736C14.0444 40.7112 13.7985 41.6246 13.74 42.5592L13.6 44.8L13.46 42.5592C13.4015 41.6246 13.1556 40.7112 12.7368 39.8736C12.2522 38.9045 12 37.836 12 36.7525V11.2475C12 10.1641 12.2522 9.09551 12.7368 8.12647C13.1556 7.28883 13.4015 6.37547 13.46 5.44078L13.6 3.20001L13.74 5.44078C13.7985 6.37547 14.0444 7.28883 14.4632 8.12647ZM11.2 14.4475C11.2 13.364 10.9478 12.2955 10.4632 11.3265C10.0444 10.4888 9.79847 9.57545 9.74005 8.64076L9.6 6.39999L9.45995 8.64076C9.40153 9.57545 9.15559 10.4888 8.73677 11.3265C8.25225 12.2955 8 13.364 8 14.4475V33.5525C8 34.6359 8.25225 35.7045 8.73677 36.6735C9.15559 37.5112 9.40153 38.4245 9.45995 39.3592L9.6 41.6L9.74005 39.3592C9.79847 38.4245 10.0444 37.5112 10.4632 36.6735C10.9478 35.7045 11.2 34.6359 11.2 33.5525V14.4475ZM6.46323 17.7264C6.94775 18.6955 7.2 19.764 7.2 20.8475V27.1525C7.2 28.2359 6.94775 29.3045 6.46323 30.2735C6.04441 31.1112 5.79847 32.0245 5.74005 32.9592L5.6 35.2L5.45995 32.9592C5.40153 32.0245 5.15559 31.1112 4.73677 30.2735C4.25225 29.3045 4 28.2359 4 27.1525V20.8475C4 19.764 4.25225 18.6955 4.73677 17.7264C5.15559 16.8888 5.40153 15.9754 5.45995 15.0408L5.6 12.8L5.74005 15.0408C5.79847 15.9754 6.04441 16.8888 6.46323 17.7264ZM3.19984 24L3.2 24.0475V23.9525L3.19984 24ZM0 24.0475L0.000161422 24C0.00741925 25.0672 0.259327 26.1187 0.736771 27.0735C1.15559 27.9112 1.40153 28.8245 1.45995 29.7592L1.6 32L1.74005 29.7592C1.79847 28.8245 2.04441 27.9112 2.46323 27.0735C2.94067 26.1187 3.19258 25.0672 3.19984 24C3.19258 22.9328 2.94067 21.8813 2.46323 20.9265C2.04441 20.0888 1.79847 19.1755 1.74005 18.2408L1.6 16L1.45995 18.2408C1.40153 19.1755 1.15559 20.0888 0.736771 20.9265C0.259327 21.8813 0.00741927 22.9328 0.000161422 24L0 23.9525V24.0475ZM18.4632 4.92646C18.9478 5.8955 19.2 6.96405 19.2 8.04747V39.9525C19.2 41.036 18.9478 42.1045 18.4632 43.0735C18.0444 43.9112 17.7985 44.8245 17.74 45.7592L17.6 48L17.46 45.7592C17.4015 44.8245 17.1556 43.9112 16.7368 43.0735C16.2522 42.1045 16 41.036 16 39.9525V8.04747C16 6.96405 16.2522 5.8955 16.7368 4.92646C17.1556 4.08882 17.4015 3.17545 17.46 2.24077L17.6 0L17.74 2.24077C17.7985 3.17545 18.0444 4.08882 18.4632 4.92646ZM26.4632 4.92646C26.9478 5.8955 27.2 6.96405 27.2 8.04747V39.9525C27.2 41.036 26.9478 42.1045 26.4632 43.0735C26.0444 43.9112 25.7985 44.8245 25.74 45.7592L25.6 48L25.46 45.7592C25.4015 44.8245 25.1556 43.9112 24.7368 43.0735C24.2522 42.1045 24 41.036 24 39.9525V8.04747C24 6.96405 24.2522 5.8955 24.7368 4.92646C25.1556 4.08882 25.4015 3.17545 25.46 2.24077L25.6 0L25.74 2.24077C25.7985 3.17545 26.0444 4.08882 26.4632 4.92646ZM31.2 11.2475C31.2 10.1641 30.9478 9.09551 30.4632 8.12647C30.0444 7.28883 29.7985 6.37547 29.74 5.44078L29.6 3.20001L29.46 5.44078C29.4015 6.37547 29.1556 7.28883 28.7368 8.12647C28.2522 9.09551 28 10.1641 28 11.2475V36.7525C28 37.836 28.2522 38.9045 28.7368 39.8736C29.1556 40.7112 29.4015 41.6246 29.46 42.5592L29.6 44.8L29.74 42.5592C29.7985 41.6246 30.0444 40.7112 30.4632 39.8736C30.9478 38.9045 31.2 37.836 31.2 36.7525V11.2475ZM34.4632 11.3265C34.9478 12.2955 35.2 13.364 35.2 14.4475V33.5525C35.2 34.6359 34.9478 35.7045 34.4632 36.6735C34.0444 37.5112 33.7985 38.4245 33.74 39.3592L33.6 41.6L33.46 39.3592C33.4015 38.4245 33.1556 37.5112 32.7368 36.6735C32.2523 35.7045 32 34.6359 32 33.5525V14.4475C32 13.364 32.2523 12.2955 32.7368 11.3265C33.1556 10.4888 33.4015 9.57545 33.46 8.64076L33.6 6.39999L33.74 8.64076C33.7985 9.57545 34.0444 10.4888 34.4632 11.3265ZM39.2 20.8475C39.2 19.764 38.9478 18.6955 38.4632 17.7264C38.0444 16.8888 37.7985 15.9754 37.74 15.0408L37.6 12.8L37.46 15.0408C37.4015 15.9754 37.1556 16.8888 36.7368 17.7264C36.2523 18.6955 36 19.764 36 20.8475V27.1525C36 28.2359 36.2523 29.3045 36.7368 30.2735C37.1556 31.1112 37.4015 32.0245 37.46 32.9592L37.6 35.2L37.74 32.9592C37.7985 32.0245 38.0444 31.1112 38.4632 30.2735C38.9478 29.3045 39.2 28.2359 39.2 27.1525V20.8475ZM43.1998 24C43.1999 24.0158 43.2 24.0316 43.2 24.0475V23.9525C43.2 23.9684 43.1999 23.9842 43.1998 24ZM40.0002 24C40.0074 25.0672 40.2593 26.1187 40.7368 27.0735C41.1556 27.9112 41.4015 28.8245 41.46 29.7592L41.6 32L41.74 29.7592C41.7985 28.8245 42.0444 27.9112 42.4632 27.0735C42.9407 26.1187 43.1926 25.0672 43.1998 24C43.1926 22.9328 42.9407 21.8813 42.4632 20.9265C42.0444 20.0888 41.7985 19.1755 41.74 18.2408L41.6 16L41.46 18.2408C41.4015 19.1755 41.1556 20.0888 40.7368 20.9265C40.2593 21.8813 40.0074 22.9328 40.0002 24ZM40.0002 24C40.0001 23.9842 40 23.9684 40 23.9525V24.0475C40 24.0316 40.0001 24.0158 40.0002 24Z"
                className="ccustom"
                fill="#2b7fff"
              ></path>{" "}
            </svg>
          </div>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-medium text-white font-outfit">
          Login
        </h1>
        <p className="mb-10 text-gray-400 font-monospace font-medium text-center sm:text-lg">
          Login to your account to get started.
        </p>
        <form
          className="flex flex-col items-center justify-center gap-4 w-full"
          onSubmit={handleSubmit}
        >
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
              <i className="flex justify-center items-center bi bi-envelope text-white/50 text-xl"></i>
              <input
                className="focus:outline-0 w-full text-sm sm:text-base font-medium text-white/50 disabled:cursor-not-allowed"
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
              <i className="flex justify-center items-center bi bi-lock text-white/50 text-xl"></i>
              <input
                className="focus:outline-0 w-full text-sm sm:text-base font-medium text-white/50 disabled:cursor-not-allowed"
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
              <p className="ml-3 text-xs text-red-500 mt-1">*Required</p>
            ) : (
              <p></p>
            )}
            <p className="text-blue-500 text-xs sm:text-sm text-end mr-3 mt-2 hover:underline cursor-pointer font-medium">
              Forgot password?
            </p>
          </div>
          <div className="w-full flex flex-col mt-10">
            <button
              type="submit"
              className="bg-blue-500 text-white text-base sm:text-lg font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
              disabled={
                loading || emailError || email === "" || password === ""
              }
            >
              {loading ? <ClipLoader color="white" size={15} /> : "Login"}
            </button>
            <p className="ml-3 mt-2 text-xs sm:text-sm text-gray-300 font-medium">
              Don't have an account?{" "}
              <span className="text-blue-500 underline font-medium">
                <Link to={"/signup"}>Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
