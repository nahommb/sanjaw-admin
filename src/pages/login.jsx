import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import ErrorPopCard from "../components/error_pop_card.jsx";

export default function Login() {

  const {loading,error,handleLogin} = useContext(AuthContext);

  const [email,setEmail] = useState();
  const [password , setPassword] = useState();

  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-orange-500 font-bold text-lg mb-4">Login</h1>


      <form onSubmit={
        (e)=>{
          e.preventDefault();
          handleLogin(email,password);
        }
        
        }>

        <div className="flex flex-col space-y-4 bg-white h-80 items-center justify-center w-80 sm:w-96 rounded-lg p-4 shadow-lg shadow-gray-400">
          {error && <ErrorPopCard message={error} />}
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}
            className="p-1 pl-2 rounded-lg border border-gray-500 text-orange-500 w-64"
          />
          <input
            required
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            className="p-1 pl-2 rounded-lg border border-gray-500 text-orange-500 w-64"
          />

          <button
            type="submit"
            className="bg-red-500 w-40 p-2 rounded-lg flex justify-center items-center hover:bg-green-500 disabled:opacity-50"
          >
          {loading&&<p>Loading</p>} Login
          </button>
        </div>
      </form>
    </div>
  );
}
