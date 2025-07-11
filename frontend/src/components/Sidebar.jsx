import React from "react";

function Sidebar() {
  return (
    <div className="fixed left-0 top-16 w-50 h-full bg-gray-950 outline outline-white/10 p-6">
      <div className="flex flex-row gap-3 ">
        <i className="bi bi-clock-history text-white"></i>
        <h1 className="text-white font-medium font-outfit">History</h1>
      </div>
    </div>
  );
}

export default Sidebar;
