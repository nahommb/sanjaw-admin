import { useContext ,useEffect} from "react"
import { LiveStreamContext } from "../context/live_stream_context"
import { Button, Select } from "@mui/material";

export default function LiveStream (){


  const {liveEvent,getLiveEvent} = useContext(LiveStreamContext);

 useEffect(()=>{
    getLiveEvent();
},[])

    return <div>
      <p className="text-orange-500 text-lg">live matches</p>
      <div className="mb-10">
        {liveEvent.map((match,index)=>{
            return <div key={index}>
                <p>{match.home_team} vs {match.away_team}</p>
            </div>
        })}
      </div>
      <p>create live match</p>
      <div className="my-5">
        <form onSubmit={
            (e)=>{
               e.preventDefault() 
            }
        } className="flex flex-coloumn justify-between">
            <input type="text" placeholder="Home Team" className="p-2 border rounded-lg"/>
            <input type="text" placeholder="Away Team" className="p-2 border rounded-lg"/>
            <input type="text" placeholder="Live Id" className="p-2 border rounded-lg"/>
            <Button type="submit">Create</Button>
        </form>
      </div>
      <p>Stream Match</p>
      <form className="flex flex-coloumn justify-between my-5">
        <input type="text" placeholder="Event" className="p-2 border rounded-lg"/>
        <select className="p-2 border rounded-lg">
           <option>Home</option>
           <option>Away</option>
        </select>
        <input type="text" placeholder="Team Name" className="p-2 border rounded-lg"/>
        <Button>Stream</Button>
      </form>
      <div>
        
      </div>
    </div>
}