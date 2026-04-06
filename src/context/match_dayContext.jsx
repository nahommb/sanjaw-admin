import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./helper/base_url";

export const MatchDayContext = createContext();

export function MatchDayProvider ({children}){

   const [loading,setLoading] = useState(false);
   const [error,setError] = useState(null);
   const [matchDays,setMatchDays] = useState([]);

const getMatchDay = async(page)=>{
  console.log("Fetching match days for page:", page);
  try{
    setLoading(true)
    setError(null);
    const res = await axios.get(`${baseUrl}posts/matchdays?page=${page}`)
    
    // if(res.status === 200){
        setMatchDays(res.data)

    // }
  }
  catch(err){
    setError(err)
  }
  finally{
    setLoading(false)
  }
}

const createMatchDay = async({home_team,away_team,match_date,event_type,venue})=>{

  try{
        setLoading(true)
        setError(null)
     const res = await axios.post(`${baseUrl}posts/creatematchday`,{
        home_team,
        away_team,
        match_date,
        event_type,
        venue
     },
      {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
    )
    }
    catch(err){
        setError(err)
    }
    finally{
        setLoading(false)
        getMatchDay(1);
    }
}
const deleteMatchDay = async(id)=>{

  try{
        setLoading(true)
        setError(null)
     const res = await axios.delete(`${baseUrl}posts/deletematchday/${id}`,
      {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
    )
    }
    catch(err){
        setError(err)
    }
    finally{
        setLoading(false)
        getMatchDay(1);
    }
}
   return(
    <MatchDayContext.Provider value={{getMatchDay,createMatchDay,deleteMatchDay,matchDays,loading,error}}>
        {children}
    </MatchDayContext.Provider>
   )
}