
import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "./helper/base_url";

export const StoryContext = createContext();

export function StoryProvider({children}){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [story,setStory] = useState([])

   const createStory = async ({formData})=>{
      console.log(formData)
      try{

        setLoading(true)
        setError(null)
        const res = await axios.post(`${baseUrl}stories/createstory`,formData);
       
      }
      catch(err){
       setError(err)
      }
      finally{
        setLoading(false)
      }
   }
   
   const getStory = async()=>{
 
    try{
    setLoading(true)
    setError(null)
     const res = await axios.get(`${baseUrl}stories/getstory`)
      if(res.status === 200){
          console.log(res.data)
            setStory(res.data);
        }
    }
    catch(err){
     setError(err)
    }
    finally{
        setLoading(false)
    }
   }

   const deleteStory = async(id)=>{

      try{
        setLoading(true)
        setError(null)
        const res = await axios.delete(`${baseUrl}stories/deletestory/${id}`)
      }
      catch(err){
        setError(err)
      }
      finally{
        setLoading(false)
      }
   }


    return <StoryContext.Provider value = {{loading,error,story,createStory,getStory,deleteStory}}>
        {children}
    </StoryContext.Provider>
}