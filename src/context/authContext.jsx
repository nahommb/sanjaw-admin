import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "./helper/base_url";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();  // ✅ correct

const handleLogin = async (email, password) => {
  try {
    setLoading(true);
    setError(null);

    const res =  await axios.post(
      `${baseUrl}auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
         withCredentials: true,
      }
    );

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/"); 
    }
    setError(res.data.message);
  } catch (err) {
    console.error(err); // add this for more info
    setError("Failed to login");
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthContext.Provider value={{ user,loading, error, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
