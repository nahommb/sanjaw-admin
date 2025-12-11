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
     const res = await axios.post(`${baseUrl}posts/createpost`, postData, {
        // headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      getPosts();
      
    } catch (err) {
      setError("Failed to create post");
      console.log('eerrr')
    } finally {
      setLoading(false);
      //
    }
  }

  const getPosts = async(page)=>{
    try{
      setLoading(true);
      setError(null);
      const res = await axios.get(`${baseUrl}posts/allposts?page=${page}&limt=6`, {
        withCredentials: true,
      });
      if(res.status === 200){
        setPosts(res.data);
      }
    }
    catch(err){
      setError("Failed to fetch posts");
    }
    finally{
      setLoading(false);
    }
  }

  const deletePost = async(postId)=>{

    console.log("Deleting post:", postId);
    try{
      setLoading(true);
      setError(null);
      const res = await axios.delete(`${baseUrl}posts/deletepost/${postId}`, {
        withCredentials: true,
      });
      if(res.status === 200){
        setPosts(posts.filter((post)=>post.id !== postId));
      }
    }
    catch(err){
      setError("Failed to delete post");
    }
    finally{
      setLoading(false);
    }
  }

  const editPost = async(postId,updatedContent)=>{
    try{
      setLoading(true);
      setError(null);
      const res = await axios.patch(`${baseUrl}posts/editpost/${postId}`,
        {content:updatedContent}, {
        withCredentials: true,
      });
      if(res.status === 200){
        setPosts(posts.map((post)=>post.id === postId ? {...post, content: updatedContent} : post));
      }
    }
    catch(err){
      setError("Failed to edit post");
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
    <DataContext.Provider value={{createPost, getPosts,editPost,deletePost,posts,loading, error}}>
      {children}
    </DataContext.Provider>
  );
}
   