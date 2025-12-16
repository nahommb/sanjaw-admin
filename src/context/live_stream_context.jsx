import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./helper/base_url";

export const LiveStreamContext = createContext();

export function LiveStreamProvider ({children}){

   const [loading,setLoading] = useState(false);
   const [error,setError] = useState(null);
   const [liveEvent,setLiveEvent] = useState([]);


const getLiveEvent = async()=>{
  try{
    setLoading(true)
    setError(null);
    const res = await axios.get(`${baseUrl}livestream/getlivematch`)
    console.log(res.data)
    if(res.status === 200){
        setLiveEvent(res.data)

    }
  }
  catch(err){
    setError(err)
  }
  finally{
    setLoading(false)
  }
}
const streamMatch = async({match_id,event_type,team_type,team_name})=>{

  try{
        setLoading(true)
        setError(null)
     const res = await axios.post(`${baseUrl}livestream/sendevent`,{
        match_id,
        event_type,
        team_type,
        team_name
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
    }
}

const createLiveMatch = async({home_team,away_team,live_id})=>{

    try{
          setLoading(true)
          setError(null)
       const res = await axios.post(`${baseUrl}livestream/createlivematch`,{
          home_team,
          away_team,
          live_id
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
      }
  }

  const updateScore = async({match_id,home_score,away_score})=>{
    
    try{
          setLoading(true)
          setError(null)
       const res = await axios.post(`${baseUrl}livestream/updatescore`,{
          match_id,
          home_score,
          away_score
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
      }
  }

    return <LiveStreamContext.Provider value = {{loading,error,liveEvent,getLiveEvent,streamMatch,createLiveMatch,updateScore}}>
        {children}
    </LiveStreamContext.Provider>
}