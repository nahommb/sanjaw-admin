import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"


export default function Setting() {
    
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [oldPassword,setOldPassword] = useState('')
    const [role,setRole] = useState('admin')


    const {changePassword,user} = useContext(AuthContext);



    return <div>
        <h2>Create New Admin</h2>
        <div className="mt-4">
            <form>
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
                <form onSubmit={
                    (e)=>{
                        e.preventDefault()
                        if(confirmPassword === password){
                            changePassword(user.id,oldPassword,password)
                        }          
                    }
                } className="mt-4">
                    <input required placeholder="old password" onChange={(e)=>setOldPassword(e.target.value)} className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <input required placeholder="new password" onChange={(e)=>setPassword(e.target.value)} className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <input required placeholder="confirm new password" onChange={(e)=>setConfirmPassword(e.target.value)} className="border border-orange rounded-lg m-2 p-1 pl-2"/>
                    <button type="submit" className="bg-orange px-4 p-1 rounded-lg m-2">Change</button>
                </form>
            </div>
        </div>
    </div>
}