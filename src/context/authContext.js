import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "./helper/base_url";

const AuthContext = createContext();


export default function AuthProvider({children}) {

//   const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

const handleLogin = async ({email,password})=>{
    // const localStorage = 
  try{
    setLoading(true);
    const res = await axios.post(`${baseUrl}login`);
    if(res.status == 200){
     localStorage.setItem('token',res.data.token)
    }
  }
  catch(err){
   setError('Failed to login')
  }
  finally{
    setLoading(false)
  }
}


    return <AuthContext.Provider value={{loading,error,handleLogin}}>
            {children}
            </AuthContext.Provider>
}