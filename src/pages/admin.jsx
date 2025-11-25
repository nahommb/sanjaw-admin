import { useContext } from "react";
import AdminBody from "../components/admin_body";
import AdminNavbar from "../components/admin_navbar";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { PageLoading } from "../components/page_loading.jsx";


export default function Admin() {
  const { user, loadingUser } = useContext(AuthContext);

  console.log("Admin Page User:", user);

  if (loadingUser) {
    // Optionally show a spinner or blank screen while checking token
    return <PageLoading />;
  }

  if (!user) { 
    return <Navigate to="/login" replace={true} />;
  } 

  return (
    <div> 
      <AdminNavbar />
      <AdminBody />
    </div>
  );    
}
