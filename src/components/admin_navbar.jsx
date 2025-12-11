import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function AdminNavbar() {

  const {user} = useContext(AuthContext);

  return (
    <div className="p-4 text-orange shadow-lg shadow-gray-400 bg-white rounded-lg fixed w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xxl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
            <p>{user.email}</p>
          <button className="bg-orange px-2 py-0.5 text-red-500 rounded-lg hover:bg-red-700 hover:text-white">Logout</button>
        </div>
      </div>
    </div>
  );
}