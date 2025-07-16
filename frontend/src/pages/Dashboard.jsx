import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import screenshot from "../assets/Screenshot 2025-07-16 165941.png";

function Dashboard() {
  const url = useRef();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post(
        "api/predict",
        {
          api_url: url.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      navigate(`/${res.data.scanId}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <Sidebar />
      <div className="mt-30 lg:mt-16 flex lg:mr-12 xl:mr-0 lg:ml-60 min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-64px)]">
        <div className="lg:ml-12 bg-gray-950 w-full p-4 flex flex-col justify-between min-h-full">
          <div className="flex flex-col">
            <h1 className="text-white text-3xl font-medium font-outfit sm:text-4xl lg:text-6xl xl:text-7xl">
              Get a full report of the
              <span className="text-blue-500 font-bold font-outfit">
                {" "}
                risks and vulnerablities{" "}
              </span>
              in your API Design
            </h1>
            <div className="text-gray-400 text-base lg:text-lg font-medium font-monospace w-4xl max-w-full mt-4 sm:mt-10">
              Submit your API endpoint to receive a comprehensive scan report
              highlighting potential vulnerabilities and risk scores generated
              by our machine learning model.
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="lg:px-16 py-8 lg:py-16">
              <img
                src={screenshot}
                alt="Product Screenshot"
                className="w-full h-auto object-contain rounded-2xl shadow-lg shadow-gray-800"
              />
            </div>
          </div>
          <form
            className=" bg-gray-950 flex flex-row gap-2 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div
              className={`p-3 border rounded-full flex flex-row gap-2 bg-white/5 border-white/15 focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500 w-full`}
            >
              <input
                className="focus:outline-0 w-full text-base font-medium text-gray-500 disabled:cursor-not-allowed"
                type="text"
                name="url"
                id="url"
                placeholder="Enter your API URL here"
                ref={url}
                // value={url}
                disabled={loading}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                //   validateEmail(e.target.value);
                // }}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white text-base sm:text-sm font-semibold p-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
                disabled={loading || url === ""}
              >
                {loading ? (
                  <ClipLoader color="white" size={14} />
                ) : (
                  <i className="bi bi-send"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
