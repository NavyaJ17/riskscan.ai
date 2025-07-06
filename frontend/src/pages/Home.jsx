import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Home() {
  const [url, setUrl] = useState(
    "https://ecommerce-kto7.onrender.com/products"
  );
  const [urlError, setUrlError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(`HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 22738
ETag: W/"58d2-2iC9wlBMnlxaMC7EQlozvG51Dls"
Date: Sun, 06 Jul 2025 08:40:10 GMT
Connection: close

{
  "success": true,
  "stats": {
    "average_risk_category": "Low",
    "mean_risk_score": 1.3437745571136475,
    "total_endpoints": 23
  },
  "prediction": [
    {
      "alertname": "CSP: Failure to Define Directive with No Fallback",
      "desc": "<p>The Content Security Policy fails to define one of the directives that has no fallback. Missing/excluding them is the same as allowing anything.</p>",
      "endpoint": "https://ecommerce-kto7.onrender.com/",
      "method": "GET",
      "predicted_risk_score": 1.1719257831573486,
      "risk_category": "Low",
      "solution": "<p>Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.</p>"
    },...
}`);

  function validateUrl(value) {
    if (value === "") {
      setUrlError("*Required");
    } else {
      try {
        new URL(value);
        setUrlError(false);
      } catch (err) {
        setUrlError("*Please enter a valid url");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post("api/demo-scan", {
        api_url: url,
      });

      let responseString = ``;
      responseString += `HTTP/1.1 ${res.status} ${res.statusText}\n`;
      responseString += `X-Powered-By: Express\n`;
      responseString += `Content-Type: ${res.headers["content-type"]}\n`;
      responseString += `Content-Length: ${res.headers["content-length"]}\n`;
      responseString += `ETag: ${res.headers["etag"]}\n`;
      responseString += `Date: ${res.headers["date"]}\n`;
      responseString += `Connection: ${res.headers["connection"]}\n\n`;

      responseString += JSON.stringify(res.data, null, 4);
      setRes(responseString);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setRes(null);
      setLoading(false);
    }
  }

  return (
    <div className=" mt-16 flex flex-col max-w-full outline outline-white/10">
      <Navbar />
      <div className="bg-gray-950 pt-10 sm:pt-20 flex flex-col gap-4 sm:gap-10 px-2 max-sm:px-4 pb-10">
        <div className=" text-white text-4xl font-medium font-outfit sm:text-5xl lg:text-6xl xl:text-8xl ">
          Know your{" "}
          <span className="text-blue-500 font-bold">API design risk score</span>{" "}
          and vulnerabilities before deploying them.
        </div>
        <p className="text-gray-400 text-lg font-medium font-monospace w-4xl max-w-full">
          Don’t wait for a breach. Identify API threats in real-time, prioritize
          vulnerabilities, and secure your endpoints with AI-driven insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to={"/signup"}>
            <button className="w-full sm:w-auto bg-gray-700 text-white text-md font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-gray-600 ">
              Get Started
            </button>
          </Link>
          <Link to={"#demo"}>
            <button className="w-full sm:w-auto bg-white/5 border border-white/15 text-white text-md font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-white/10">
              Try a demo scan
            </button>
          </Link>
        </div>
      </div>
      <div className=" bg-gray-950 max-w-full">
        <div className=" bg-gray-950">
          <div className="flex flex-col sm:flex-row bg-white/10 outline outline-white/10 p-2 gap-2">
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 lg:p-8 flex flex-col items-center outline outline-white/10">
              <i className="bi bi-stopwatch text-gray-400 text-6xl"></i>
              <h1 className="text-white font-semibold text-xl @md:text-2xl text-center mt-6 mb-2 font-outfit">
                Real-time Scanning
              </h1>
              <p className="text-gray-400 text-sm/6 font-medium font-monospace">
                Scan your APIs instantly and detect vulnerabilities before
                attackers do or before you deploy them.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 lg:p-8 outline outline-white/10 flex flex-col items-center">
              <i className="bi bi-clipboard-data text-gray-400 text-6xl"></i>
              <h1 className="text-white font-semibold text-xl @md:text-2xl text-center mt-6 mb-2 font-outfit">
                AI Risk Assessment
              </h1>
              <p className="text-gray-400 text-sm/6 font-medium font-monospace">
                Leverage machine learning models like XGBoost intelligently
                classify, score, and prioritize API vulnerabilities.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 lg:p-8 outline outline-white/10 flex flex-col items-center">
              <i className="bi bi-braces-asterisk text-gray-400 text-6xl"></i>
              <h1 className="text-white font-semibold text-xl @md:text-2xl text-center mt-6 mb-2 font-outfit">
                Interactive Demo Scan
              </h1>
              <p className="text-gray-400 text-sm/6 font-medium font-monospace">
                Run a quick scan on a sample API endpoint to see how RiskScan.AI
                works in action.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row max-w-full max-h-lg">
          <div className="p-2 outline outline-white/10 bg-white/10 min-w-1/2 ">
            <div className="p-2 bg-gray-950 rounded-2xl outline outline-white/10">
              <div className="flex flex-col lg:flex-row justify-center gap-6 p-6 lg:gap-8 lg:p-8">
                <i class="bi bi-upc-scan text-6xl text-white/50"></i>
                <div className="flex flex-col">
                  <p className="text-xs text-pink-500 font-medium">
                    TRY IT YOURSELF!
                  </p>
                  <h1 className="text-white font-outfit text-xl/10 md:text-2xl/10 font-semibold">
                    Try out a Demo Scan
                  </h1>
                  <p className="text-sm/6 text-gray-400 font-monospace font-medium">
                    Enter a sample public API URL to see how it all works in
                    action on a single endpoint.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div
                      className={`p-2 px-4 pr-2 border rounded-full flex flex-row gap-2 bg-white/5 ${
                        urlError ? "border-red-500" : "border-white/15"
                      } ${
                        urlError
                          ? "ring-3 ring-red-500/40"
                          : "focus-within:ring-3 focus-within:ring-blue-500/40 focus-within:border-blue-500"
                      }  mt-4`}
                    >
                      <input
                        className="focus:outline-0 w-full text-sm font-medium text-gray-500 disabled:cursor-not-allowed"
                        type="text"
                        name="url"
                        id="url"
                        value={url}
                        defaultValue="https://ecommerce-kto7.onrender.com/products"
                        disabled={loading}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          validateUrl(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white text-base sm:text-sm font-semibold p-2 py-1 rounded-full cursor-pointer hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300"
                        disabled={loading || urlError || url === ""}
                      >
                        {loading ? (
                          <ClipLoader color="white" size={14} />
                        ) : (
                          <i class="bi bi-send"></i>
                        )}
                      </button>
                    </div>
                    {urlError ? (
                      <p className="ml-3 text-xs text-red-500 mt-1">
                        {urlError}
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </form>
                </div>
              </div>
              <div className="background-2 bg-fixed pt-4 pl-4 sm:pl-8 sm:pt-8 rounded-2xl pr-0 outline outline-white/10">
                <div className="bg-gray-950 pl-2 pt-1 rounded-tl-2xl border border-white/10 border-r-0 border-b-0">
                  <div className="p-2 flex flex-row gap-2">
                    <span className="size-3 rounded-full bg-white/20"></span>
                    <span className="size-3 rounded-full bg-white/20"></span>
                    <span className="size-3 rounded-full bg-white/20"></span>
                  </div>
                  <SyntaxHighlighter
                    language="javascript"
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
                    {`POST /api/demo-scan
Content-Type: application/json

{
    "api_url": "${url}"
}`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 outline outline-white/10 bg-white/10 lg:max-w-1/2">
            <div className="p-2 bg-gray-950 outline outline-white/10 rounded-2xl max-h-full">
              <div className="background-2 bg-fixed pt-4 pl-4 sm:pl-8 sm:pt-8 rounded-2xl pr-0 outline outline-white/10 max-h-full">
                <div className="bg-gray-950 pl-2 pt-1 rounded-tl-2xl border border-white/10 border-r-0 border-b-0 max-h-full">
                  <div className="p-2 flex flex-row gap-2">
                    <span className="size-3 rounded-full bg-white/20"></span>
                    <span className="size-3 rounded-full bg-white/20"></span>
                    <span className="size-3 rounded-full bg-white/20"></span>
                  </div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={gruvboxDark}
                    showLineNumbers
                    customStyle={{
                      borderRadius: "1rem 0 1rem 0",
                      margin: "0",
                      maxHeight: "406px",
                    }}
                    codeTagProps={{
                      style: {
                        fontSize: "14px",
                      },
                    }}
                  >
                    {res}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
