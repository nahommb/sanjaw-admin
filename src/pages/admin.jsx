import AdminBody from "../components/admin_body";
import AdminNavbar from "../components/admin_navbar";
import { Navigate } from "react-router-dom";


export default function Admin() {
   const user = false;
   
    if(user){
         return (
    <div className="">
      <AdminNavbar />
      <AdminBody />
    </div>
  );
}
else{
    return <Navigate to="/login" replace={true} />
} 
}