import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";

function Sidebar() {
  const { accessToken } = useContext(AppContext);
  const [data, setData] = useState(null);
  const { scanId } = useParams();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get("/api/history", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setData(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getHistory();
  }, []);

  const timeSince = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} y ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} mo ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} d ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} h ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} m ago`;

    return "just now";
  };

  return (
    <div className="fixed left-0 top-16 pb-22 w-2xs h-full bg-gray-950 outline outline-white/10 overflow-y-scroll">
      <div className="flex flex-col gap-8">
        <div className="p-6 pt-8">
          <Link to={`/new`}>
            <button className=" bg-white/5 border border-white/15 text-white text-sm font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-white/10 disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center gap-2">
              <i className="bi bi-plus text-xl"></i>
              <span className="flex-1">New Scan</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-row gap-3 px-6">
          <i className="bi bi-clock-history text-white"></i>
          <h1 className="text-white font-medium font-outfit">History</h1>
        </div>
        <div className="flex flex-col gap-2 font-semibold">
          {data &&
            data.history
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <Link to={`/${item._id}`} key={item._id}>
                    <div
                      className={`group text-white flex flex-col gap-3 px-6 py-3 border-l-2 border-transparent
                      ${
                        scanId === item._id
                          ? "border-l-2 border-l-white"
                          : "hover:border-l-2 hover:border-l-white/25"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div
                          className={`text-xs uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-48 flex-1 group-hover:text-blue-500 tracking-widest
                           ${
                             scanId === item._id
                               ? "text-blue-500"
                               : "text-gray-300"
                           }`}
                        >
                          {item.url}
                        </div>
                        <div className="text-xs text-gray-500">
                          {timeSince(item.timestamp)}
                        </div>
                      </div>
                      <div
                        className={`text-xs pl-6 border-l-1 border-l-white/10 flex flex-col gap-1 group-hover:text-gray-400
                        ${
                          scanId === item._id
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        <div> Endpoints : {item.total_endpoints}</div>
                        <div>
                          {" "}
                          Average Risk Score : {item.mean_risk_score.toFixed(2)}
                        </div>
                        <div>
                          Average Risk Category : {item.average_risk_category}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
