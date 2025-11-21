import { useState } from "react";
import Dashboard from "./dashboard";
import Setting from "./setting";
import { MatchDay } from "./match_day";
import { Post } from "./post";
import { Story } from "./story";
import { FaHome, FaNewspaper, FaCalendar, FaVideo, FaImages, FaCog, FaChartBar } from "react-icons/fa";

export default function AdminBody() {
  const [index, setIndex] = useState(0);

  const bodyParts = [
    <Dashboard />,
    <Post />,
    <MatchDay />,
    <p>Live Stream</p>,
    <Story />,
    <Setting />,
    <p>Reports</p>,
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="
        flex 
        flex-row md:flex-col 
        gap-4 
        w-full md:w-64 
        md:h-screen 
        bg-white text-orange
        p-4 mt-16 pt-16 
        rounded-lg shadow-lg shadow-gray-400
        
      ">
      <ul className="flex flex-row md:flex-col md:gap-12 gap-4 justify-between w-full">
        <li>
            <button onClick={() => setIndex(0)} className="flex items-center gap-2">
            {/* Icon for mobile */}
            <FaHome className="text-xl text-orange-500" />
            {/* Text for desktop */}
            <span className="hidden md:block">Dashboard</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(1)} className="flex items-center gap-2">
            <FaNewspaper className="text-xl text-orange-500" />
            <span className="hidden md:block">Post</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(2)} className="flex items-center gap-2">
            <FaCalendar className="text-xl text-orange-500" />
            <span className="hidden md:block">Match Day</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(3)} className="flex items-center gap-2">
            <FaVideo className="text-xl text-orange-500" />
            <span className="hidden md:block">Live Stream</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(4)} className="flex items-center gap-2">
            <FaImages className="text-xl text-orange-500" />
            <span className="hidden md:block">Story</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(5)} className="flex items-center gap-2">
            <FaCog className="text-xl text-orange-500" />
            <span className="hidden md:block">Settings</span>
            </button>
        </li>

        <li>
            <button onClick={() => setIndex(6)} className="flex items-center gap-2">
            <FaChartBar className="text-xl text-orange-500" />
            <span className="hidden md:block">Reports</span>
            </button>
        </li>
</ul>
      </div>

      {/* Main Content */}
      <div className="bg-white m-4 mt-20 rounded-lg w-full p-8 shadow-lg shadow-gray-400">
        {bodyParts[index]}
      </div>

    </div>
  );
}
