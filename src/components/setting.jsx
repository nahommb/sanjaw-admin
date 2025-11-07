import { useState } from "react"


export default function Setting() {
    
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [role,setRole] = useState('admin')

    function createAdmin(e){
      e.preventDefault()

      try{
            if(password !== confirmPassword){
                alert("Password and Confirm Password must be the same")
                return
            }
           const res = fetch('',{
            method:"POST"
           }
           
           )
            // make api call to create new admin
      }
      catch(err){

      }
    }

    function changePassword(e){
        e.preventDefault()
        // make api call to change password
    }

    return <div>
        <h2>Create New Admin</h2>
        <div className="mt-4">
            <form onSubmit={createAdmin}>
                <input required placeholder="username" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                <input required placeholder="password" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                <input required placeholder="confirm password" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                <select className="border border-orange rounded-lg m-2 p-1 pl-2">
                    <option value="superAdmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                </select>
                <button type="submit" className="bg-orange text-white px-4 p-1 rounded-lg m-2">Create</button>
            </form>
        </div>
        <div className="mt-8">
            <h2>Change Password</h2>
            <div>
                <form onSubmit={changePassword} className="mt-4">
                    <input required placeholder="old password" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <input required placeholder="new password" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <input required placeholder="confirm new password" className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <button type="submit" className="bg-orange text-white px-4 p-1 rounded-lg m-2">Change</button>
                </form>
            </div>
        </div>
    </div>
}