import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

function Sidebar() {
  const { setIsLoggedIn, userData, setUserData, accessToken, setAccessToken } =
    useContext(AppContext);
  const [data, setData] = useState(null);
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState();

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

  async function logout() {
    try {
      const res = await axios.post("api/logout");
      setIsLoggedIn(false);
      setUserData(null);
      setAccessToken(null);
      navigate("/");
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

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

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`fixed left-0 top-16 lg:pb-22 w-screen lg:w-2xs bg-gray-950 outline outline-white/10 overflow-scroll lg:h-full
    ${isOpen ? "h-full" : "h-auto"}`}
    >
      <div className="flex lg:hidden flex-row h-14 px-4 items-center border-b border-b-white/10">
        <i
          className="bi bi-list text-base text-white"
          onClick={toggleSidebar}
        ></i>
        <div className="ml-4 text-sm/6 flex flex-row items-center gap-3">
          <p className="text-gray-400">{userData.firstName}</p>
          <i className="bi bi-chevron-right text-gray-400 text-xs"></i>
          <p className="text-white">new</p>
        </div>
      </div>
      <div
        className={`flex-col gap-4 lg:flex
        ${isOpen ? "flex" : "hidden"}
        `}
      >
        <div className="p-6 pt-8 flex flex-col gap-2">
          <Link to={`/new`} className="flex items-center gap-3">
            <i className="bi bi-plus-lg text-gray-400"></i>
            <span className="flex-1 text-gray-300 font-semibold hover:underline hover:text-white">
              New Scan
            </span>
          </Link>
          <div className="flex items-center gap-3" onClick={logout}>
            <i className="bi bi-box-arrow-left text-gray-400"></i>
            <span className="flex-1 text-gray-300 font-semibold hover:underline cursor-pointer hover:text-white">
              Logout
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2 px-6">
          <h1 className="text-gray-400 font-semibold ">History</h1>
        </div>
        <div className="flex flex-col gap-2 font-semibold overflow-scroll">
          {data &&
            data.history
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <Link to={`/${item._id}`} key={item._id}>
                    <div
                      className={`group overflow-scroll text-white flex flex-col gap-3 px-6 py-3 border-l-2 border-transparent
                      ${
                        scanId === item._id
                          ? "border-l-2 border-l-white"
                          : "hover:border-l-2 hover:border-l-white/25"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div
                          className={`text-sm uppercase whitespace-nowrap overflow-hidden text-ellipsis lg:max-w-48 flex-1 group-hover:text-blue-500 tracking-widest
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
                        className={`text-sm pl-6 border-l-1 border-l-white/10 flex flex-col gap-1 group-hover:text-gray-400
                        ${
                          scanId === item._id
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        <div> Endpoints : {item.total_endpoints}</div>
                        <div>
                          {" "}
                          Avg. Risk Score : {item.mean_risk_score.toFixed(2)}
                        </div>
                        <div>
                          Avg. Risk Category : {item.average_risk_category}
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
