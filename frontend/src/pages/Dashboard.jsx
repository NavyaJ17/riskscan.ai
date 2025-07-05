import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/Navbar";

function Dashboard() {
  const url = useRef();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AppContext);

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
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 max-w-screen bg-gray-950">
        <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
          <div
            className={`p-3 px-4 border rounded-full flex flex-row gap-2 bg-white/5 border-white/15 focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500`}
          >
            <i className="flex justify-center items-center bi bi-envelope text-gray-400 text-xl"></i>
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
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300 w-3xs"
            disabled={loading || url === ""}
          >
            {loading ? <ClipLoader color="white" size={15} /> : "Scan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
