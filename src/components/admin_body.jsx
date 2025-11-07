import { useState } from "react";
import Dashboard from "./dashboard";
import Setting from "./setting";

export default function AdminBody() {

    const [index,setIndex] = useState(0);

    const bodyParts = [
        <Dashboard/>,
        <p>2</p>,
        <p>4</p>,
        <p>5</p>,
        <Setting/>,
        <p>3</p>
       
    ]

  return (
    <div className="flex flex-row items-center justify-between min-h-screen bg-gray-100 ">
         <div className="w-64 h-screen bg-white text-orange p-4 mt-16 pt-16 rounded-lg shadow-lg shadow-gray-400">  
            <ul>
                <li><button onClick={()=>setIndex(0)}  className="mb-4">Dashboard</button></li>
                <li><button onClick={()=>setIndex(1)}  className="mb-4">Post</button></li> 
                <li><button onClick={()=>setIndex(2)}  className="mb-4">Match Day</button></li> 
                <li><button onClick={()=>setIndex(3)}  className="mb-4">Live Stream</button></li> 

                <li><button onClick={()=>setIndex(4)}  className="mb-4">Settings</button></li>
                <li><button onClick={()=>setIndex(5)}  className="mb-4">Reports</button></li> 
                

            </ul>
        </div>
        <div className="bg-white m-4 mt-20 rounded-lg w-full p-8 h-screen shadow-lg shadow-gray-400 ">
            {bodyParts[index]}
        </div>
    </div>
  );
}