import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { FiLogOut, FiUser, FiBell } from "react-icons/fi";
import sanjaw_logo from '../assets/sanjaw_logo.png'
import ConfirmModal from "./confirm_modal.jsx";

export default function AdminNavbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f172a]/60 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl">
            <img src={sanjaw_logo} alt="" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight hidden sm:block">
            Sanjaw <span className="text-orange-500">Admin</span>
          </h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          
          {/* Notifications Placeholder */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <FiBell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e293b]"></span>
          </button>

          <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white leading-none mb-1">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Administrator
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-gray-400">
              <FiUser size={20} />
            </div>
          </div>

          {/* Logout */}
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 active:scale-95"
          >
            <FiLogOut size={18} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>

      </div>

      <ConfirmModal
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          handleLogout();
        }}
        title="Logout Account"
        confirmText="Logout"
        type="danger"
      />
    </nav>
  );
}