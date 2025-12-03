import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./helper/base_url";

export const DataContext = createContext();

export function DataProvider({ children }) {
  // You can add state and functions here to manage shared data
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const createPost = async(postData) => {
    console.log(postData);
    try {

      setLoading(true);
      setError(null);
     await axios.post(`${baseUrl}posts/createpost`, postData, {
        // headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  const getPosts = async()=>{
    try{
      setLoading(true);
      setError(null);
      const res = await axios.get(`${baseUrl}posts/allposts?page=1&limt=6`, {
        withCredentials: true,
      });
      if(res.status === 200){
        setPosts(res.data);
        console.log(res.data);
        console.log(posts)
      }
    }
    catch(err){
      setError("Failed to fetch posts");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getPosts();
    console.log(posts)
  },[]);

  return (
    <DataContext.Provider value={{createPost, getPosts,posts,loading, error}}>
      {children}
    </DataContext.Provider>
  );
}
   