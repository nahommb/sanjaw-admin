import { useState } from "react";
import Dashboard from "./dashboard";
import Setting from "./setting";
import { MatchDay } from "./match_day";
import { Post } from "./post";
import { Story } from "./story";
import { FiGrid, FiEdit3, FiCalendar, FiVideo, FiLayers, FiSettings, FiBarChart2 } from "react-icons/fi";
import LiveStream from "./live_stream";

export default function AdminBody() {
  const [index, setIndex] = useState(0);

  const menuItems = [
    { label: "Dashboard", icon: <FiGrid />, component: <Dashboard /> },
    { label: "Post", icon: <FiEdit3 />, component: <Post /> },
    { label: "Match Day", icon: <FiCalendar />, component: <MatchDay /> },
    { label: "Live Stream", icon: <FiVideo />, component: <LiveStream /> },
    { label: "Story", icon: <FiLayers />, component: <Story /> },
    { label: "Settings", icon: <FiSettings />, component: <Setting /> },
    { label: "Reports", icon: <FiBarChart2 />, component: <p>Reports</p> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>

      {/* Sidebar */}
      <div className="
        relative z-10
        flex 
        flex-row md:flex-col 
        w-full md:w-64 
        bg-black/20 backdrop-blur-xl
        p-4 mt-16 md:mt-0 pt-20 md:pt-24
        border-r border-white/10
        z-10
        
      ">
        <ul className="flex flex-row md:flex-col gap-2 md:gap-4 justify-between md:justify-start w-full overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {menuItems.map((item, i) => (
            <li key={i} className="flex-shrink-0 md:flex-shrink">
              <button
                onClick={() => setIndex(i)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full
                  ${index === i 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"}
                `}
              >
                <span className={`text-xl ${index === i ? "text-orange-600" : "text-gray-400"}`}>
                  {item.icon}
                </span>
                <span className="hidden md:block font-semibold text-sm">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 bg-white/5 backdrop-blur-sm m-0 md:m-4 md:mt-24 rounded-none md:rounded-3xl p-4 md:p-8 shadow-2xl shadow-black/20 border border-white/10 overflow-y-auto no-scrollbar text-white">
        {menuItems[index].component}
      </div>

    </div>
  );
}

