import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Results() {
  const { scanId } = useParams();
  const { accessToken } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const getScanData = async () => {
      try {
        const res = await axios.get(`/api/${scanId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getScanData();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      <Navbar />
      <Sidebar />
      <div className="mt-30 lg:mt-16 flex justify-end lg:ml-72 xl:ml-60 ">
        <div className="flex flex-row "></div>
        <div className="bg-gray-950 ml-12 w-full flex flex-col items-center justify-center">
          <div className="p-2  bg-white/10 w-full ">
            <div className="flex flex-col xl:flex-row gap-2 rounded-2xl">
              <div className="flex-1/2 bg-gray-950 rounded-2xl outline outline-white/10 p-4 xl:p-8">
                <div className="flex flex-row gap-4">
                  <i className="bi bi-shield-check text-6xl text-gray-500"></i>
                  <div className="flex flex-col">
                    <h1 className="uppercase text-gray-500 text-xs/6 w-48 md:w-62 whitespace-nowrap overflow-hidden text-ellipsis font-semibold tracking-wider">
                      {data && data.prediction.url}
                    </h1>
                    <h1 className="text-gray-300 text-3xl font-outfit font-semibold">
                      Report
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row text-gray-400 justify-center w-full mt-8 text-base">
                  <div className="flex flex-col flex-1 p-2">
                    <div className="text-3xl sm:text-4xl font-bold text-center text-blue-500">
                      {data && data.prediction.total_endpoints}
                    </div>
                    <div className="text-center text-xs font-medium">
                      Total endpoints scanned
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-2">
                    <div
                      className={`text-3xl sm:text-4xl font-bold text-center
                      ${
                        data && data.prediction.average_risk_category === "Low"
                          ? "text-green-600"
                          : data &&
                            data.prediction.average_risk_category === "Medium"
                          ? "text-amber-300"
                          : "text-red-600"
                      }`}
                    >
                      {data && data.prediction.mean_risk_score.toFixed(2)}
                      <span className="text-base text-gray-400 font-medium">
                        / 10
                      </span>
                    </div>
                    <div className="text-center text-xs font-medium">
                      Average risk score
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-2">
                    <div
                      className={`text-3xl sm:text-4xl font-bold text-center
                      ${
                        data && data.prediction.average_risk_category === "Low"
                          ? "text-green-600"
                          : data &&
                            data.prediction.average_risk_category === "Medium"
                          ? "text-amber-300"
                          : "text-red-600"
                      }`}
                    >
                      {data &&
                        data.prediction.average_risk_category.substring(0, 4)}
                    </div>
                    <div className="text-center text-xs font-medium">
                      Average risk category
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gray-950 rounded-2xl outline outline-white/10 flex-1/2">
                <div className="background-2 bg-fixed pt-4 pl-4 sm:pl-6 sm:pt-6 rounded-2xl pr-0 outline outline-white/10">
                  <div className="bg-gray-950 pl-2 pt-1 rounded-tl-2xl border border-white/10 border-r-0 border-b-0">
                    <div className="p-2 flex flex-row gap-2">
                      <span className="size-3 rounded-full bg-white/20"></span>
                      <span className="size-3 rounded-full bg-white/20"></span>
                      <span className="size-3 rounded-full bg-white/20"></span>
                    </div>
                    <SyntaxHighlighter
                      language="json"
                      style={gruvboxDark}
                      showLineNumbers
                      customStyle={{
                        borderRadius: "1rem 0 1rem 0",
                        margin: "0",
                        maxHeight: "20rem",
                      }}
                      codeTagProps={{
                        style: {
                          fontSize: "14px",
                        },
                      }}
                    >
                      {`{
    "url": "${data && data.prediction.url}",
    "endpoints": ${data && data.prediction.total_endpoints},
    "average_risk_score": ${data && data.prediction.mean_risk_score.toFixed(2)},
    "average_risk_category": "${data && data.prediction.average_risk_category}"
}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 w-full bg-white/10 pb-2">
            <div className="rounded-2xl w-full overflow-scroll border border-white/10 bg-gray-950 outline outline-white/10">
              <table className="text-gray-400 text-sm table-auto min-w-full">
                <thead>
                  <tr className="text-gray-300">
                    <th className="p-4 pr-6">No.</th>
                    <th className="p-4 pr-6">Endpoint</th>
                    <th className="p-4 pr-6">Method</th>
                    <th className="p-4 pr-6">Alerts</th>
                    <th className="p-4 pr-6">Risk Category</th>
                    <th className="p-4 pr-6">Risk Score</th>
                    <th className="p-4 pr-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.prediction.predictions.map((row, index) => {
                      return (
                        <React.Fragment key={row._id}>
                          <tr className="border-t-1 border-white/10">
                            <td className="text-center">{index + 1}</td>
                            <td className="p-4 pr-6 max-w-lg text-gray-300 whitespace-nowrap overflow-x-hidden text-ellipsis font-monospace">
                              {row.endpoint}
                            </td>
                            <td className="p-3 pr-6 whitespace-nowrap text-center">
                              <span
                                className={`rounded-md font-medium max-w-full 
                            ${
                              row.method === "GET"
                                ? "text-yellow-700"
                                : "text-indigo-600"
                            }`}
                              >
                                {row.method}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-center">
                              {row.alertname.length}
                            </td>
                            <td className="p-4 pr-6 whitespace-nowrap text-center">
                              <span
                                className={`p-1 px-2 border border-white/10 rounded-md font-medium max-w-full 
                            ${
                              row.risk_category === "Low"
                                ? "text-green-300 bg-green-400/15"
                                : row.risk_category === "Medium"
                                ? "text-amber-300 bg-amber-400/15"
                                : "text-red-600 bg-red-400/15"
                            }`}
                              >
                                {row.risk_category}
                              </span>
                            </td>
                            <td className="p-4 pr-6 whitespace-nowrap text-center">
                              <span
                                className={`p-1 px-2 border border-white/10 rounded-md font-medium max-w-full 
                            ${
                              row.risk_category === "Low"
                                ? "text-green-400"
                                : row.risk_category === "Medium"
                                ? "text-amber-300"
                                : "text-red-600"
                            }`}
                              >
                                {row.predicted_risk_score.toFixed(2)}
                              </span>
                            </td>
                            <td
                              className="p-4 flex flex-row gap-2 items-center justify-center text-gray-500 cursor-pointer hover:text-blue-500"
                              onClick={() => {
                                toggleRow(row._id);
                              }}
                            >
                              <i
                                className={`bi ${
                                  expandedRows.includes(row._id)
                                    ? "bi-chevron-down rotate-180 transition duration-300"
                                    : "bi-chevron-down transition duration-300"
                                }`}
                              />
                            </td>
                          </tr>
                          {expandedRows.includes(row._id) && (
                            <tr className="">
                              <td colSpan="7" className="p-4 text-gray-400">
                                <div className="space-y-2"></div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
