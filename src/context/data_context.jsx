import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./helper/base_url";

export const DataContext = createContext();

export function DataProvider({ children }) {
  // You can add state and functions here to manage shared data
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null);

  const createPost = async(postData) => {
    console.log(postData);
    try {

      setLoading(true);
      setError(null);
     await axios.post(`${baseUrl}posts/createpost`, postData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DataContext.Provider value={{createPost, loading, error}}>
      {children}
    </DataContext.Provider>
  );
}
   