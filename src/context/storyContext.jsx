
import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "./helper/base_url";

export const StoryContext = createContext();

export function StoryProvider({children}){

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [story,setStory] = useState([])

   const createStory = async ({formData})=>{
      
      try{

        setLoading(true)
        setError(null)
        const res = await axios.post(`${baseUrl}/createstory`,formData);
       
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
     const res = await axios.get(`${baseUrl}/getstory`)
      if(res.status === 200){
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
        const res = await axios.delete(`${baseUrl}/deletestory/${id}`)
      }
      catch(err){
        setError(err)
      }
      finally{
        setLoading(fasle)
      }
   }


    return <StoryContext.Provider value = {{loading,error,createStory,getStory,deleteStory}}>
        {children}
    </StoryContext.Provider>
}