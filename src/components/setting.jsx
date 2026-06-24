import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"


export default function Setting() {
    
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [oldPassword,setOldPassword] = useState('')
    const [role,setRole] = useState('admin')


    const {changePassword,user} = useContext(AuthContext);



    return (
      <div className="max-w-4xl mx-auto p-6 space-y-12 text-white">
        {/* Create Admin Section */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">Create New Admin</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required 
              placeholder="Username" 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <input 
              required 
              type="password"
              placeholder="Password" 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <input 
              required 
              type="password"
              placeholder="Confirm Password" 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <select className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white appearance-none">
              <option value="superAdmin" className="bg-[#0f172a]">Super Admin</option>
              <option value="admin" className="bg-[#0f172a]">Admin</option>
              <option value="viewer" className="bg-[#0f172a]">Viewer</option>
            </select>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                Create Admin
              </button>
            </div>
          </form>
        </section>

        {/* Change Password Section */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">Change Password</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (confirmPassword === password) {
                changePassword(user.id, oldPassword, password);
              }          
            }} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <input 
              required 
              type="password"
              placeholder="Old Password" 
              onChange={(e) => setOldPassword(e.target.value)} 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <input 
              required 
              type="password"
              placeholder="New Password" 
              onChange={(e) => setPassword(e.target.value)} 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <input 
              required 
              type="password"
              placeholder="Confirm New Password" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="bg-white/5 border border-white/10 rounded-xl p-3 pl-4 focus:ring-2 focus:ring-orange-500/50 outline-none text-white placeholder-gray-500"
            />
            <div className="md:col-span-3 flex justify-end mt-2">
              <button type="submit" className="bg-white text-orange-600 border border-orange-500/20 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95">
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    );
}