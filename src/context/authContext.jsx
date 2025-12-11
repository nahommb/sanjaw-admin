import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./helper/base_url";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [loading, setLoading] = useState(false);        // login loading
  const [loadingUser, setLoadingUser] = useState(true); // token check loading
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [status,setStatus] = useState(null); 

  const navigate = useNavigate();

  // ✅ Check Token Once When App Loads
  const checkToken = async () => {
    setLoadingUser(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch (err) {
      localStorage.removeItem("token");
      console.error("Token invalid:", err);
    }

    setLoadingUser(false);   
  };

  useEffect(() => {
    checkToken();
  }, []);


  // ✅ Login Function
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${baseUrl}auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");

    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (id,oldPassword,newPassword)=>{
     
    try{
      const res = await axios.patch(`${baseUrl}/changepassword/${id}`,{
        'oldPassword':oldPassword,
        'newPassword':newPassword
      },
      {
        withCredentials :true
      }
      
    )
       if(res.status == 200){
        setStatus('successfuly changed')
       }
    }
    catch(err){
      setError(err)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,       // login loading
        loadingUser,   // token check loading
        error,
        handleLogin,
        checkToken,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
