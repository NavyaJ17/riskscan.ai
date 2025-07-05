import React from "react";
import Navbar from "../components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";

function Home() {
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
      <div>
        <div className=" bg-gray-950">
          <div className="flex flex-col sm:flex-row bg-white/10 outline outline-white/10 p-2 gap-2">
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 sm:p-8 flex flex-col items-center outline outline-white/10">
              <i className="bi bi-stopwatch text-blue-500 text-6xl"></i>
              <h1 className="text-white font-semibold text-xl @md:text-2xl text-center mt-6 mb-2 font-outfit">
                Real-time Scanning
              </h1>
              <p className="text-gray-400 text-sm/6 font-medium font-monospace">
                Scan your APIs instantly and detect vulnerabilities before
                attackers do or before you deploy them.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 sm:p-8 outline outline-white/10 flex flex-col items-center">
              <i className="bi bi-clipboard-data text-blue-500 text-6xl"></i>
              <h1 className="text-white font-semibold text-xl @md:text-2xl text-center mt-6 mb-2 font-outfit">
                AI Risk Assessment
              </h1>
              <p className="text-gray-400 text-sm/6 font-medium font-monospace">
                Leverage machine learning models like XGBoost intelligently
                classify, score, and prioritize API vulnerabilities.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-950 flex-1 p-6 sm:p-8 outline outline-white/10 flex flex-col items-center">
              <i className="bi bi-braces-asterisk text-blue-500 text-6xl"></i>
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
        <div className="p-2 outline outline-white/10">
          {/* <div className="bg-white/30 p-1 rounded-l-2xl max-w-lg pr-0"> */}
          <div className="bg-gray-950 p-2 pt-1 rounded-2xl outline outline-white/10">
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
                borderRadius: "1rem",
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
    },
    {
      "alertname": "CSP: Failure to Define Directive with No Fallback",
      "desc": "<p>The Content Security Policy fails to define one of the directives that has no fallback. Missing/excluding them is the same as allowing anything.</p>",
      "endpoint": "https://ecommerce-kto7.onrender.com/accessories",
      "method": "GET",
      "predicted_risk_score": 1.1348589658737183,
      "risk_category": "Low",
      "solution": "<p>Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.</p>"
    }, ...
}`}
            </SyntaxHighlighter>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* <div
        id="demo"
        className="flex flex-col sm:flex-row justify-between gap-20  px-2 max-sm:px-4"
      >
        <div className="">
          <div className="text-4xl text-gray-500"> Try a demo scan</div>
        </div> */}
    </div>
    // </div>
  );
}

export default Home;
