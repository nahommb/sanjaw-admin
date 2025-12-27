import { useContext ,useEffect, useState} from "react"
import { LiveStreamContext } from "../context/live_stream_context"
import { Button,} from "@mui/material";

export default function LiveStream (){


  const {liveEvent,getLiveEvent,streamMatch,createLiveMatch,updateScore,loading,error,sendNotification} = useContext(LiveStreamContext);

  const [eventType,setEventType] = useState();
  const [teamType,setTeamType] = useState('home');
  const [teamName,setTeamName] = useState();

  const [homeTeam,setHomeTeam] = useState();
  const [awayTeam,setAwayTeam] = useState();
  const [liveId,setLiveId] = useState();

  const [homeScore,setHomeScore] = useState();
  const [awayScore,setAwayScore] = useState();

  const [notificationTitle,setNotificationTitle] = useState();
  const [notificationMessage,setNotificationMessage] = useState();

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
               createLiveMatch(
                {home_team:homeTeam,away_team:awayTeam,live_id:liveId}
               )
            }
        } className="flex flex-coloumn justify-between">
            <input required type="text" placeholder="Home Team" onChange={((e)=>setHomeTeam(e.target.value))} className="p-2 border rounded-lg"/>
            <input required type="text" placeholder="Away Team" onChange ={((e)=>setAwayTeam(e.target.value))} className="p-2 border rounded-lg"/>
            <input required type="text" placeholder="Live Id" onChange ={((e)=>setLiveId(e.target.value))} className="p-2 border rounded-lg"/>
            <Button type="submit">{loading ? "creating..." : "Create"}</Button>
        </form>
      </div>
      <p>Stream Match</p>
      <form 
      onSubmit={(e)=>{
        e.preventDefault()
        streamMatch(
            {
            match_id:liveEvent[0].id,event_type:eventType,
            team_type:teamType,team_name:teamName}
        )
      }}
      className="flex flex-coloumn justify-between my-5">
        <input required type="text" placeholder="Event" onChange={(e)=>setEventType(e.target.value)} className="p-2 h-10 border rounded-lg"/>
        <div>
            <p className="mb-2" >Team Type</p>
            <select value={teamType} onChange={(e)=>setTeamType(e.target.value)} className="p-2 border rounded-lg" >
           <option value= 'home'>Home</option>
           <option value= 'away'>Away</option>
        </select>
        </div>
        <input type="text" placeholder="Team Name" onChange={(e)=>setTeamName(e.target.value)} className="p-2 h-10 border rounded-lg"/>
        <Button type="submit">{loading ? "streaming..." : "Stream"}</Button>
      </form>
      <div>
        <p className = 'my-2'>Score</p>
        <form 
         onSubmit={(e)=>{
            e.preventDefault()
            updateScore(
                {
                    match_id:liveEvent[0].id,
                    home_score:homeScore,
                    away_score:awayScore
                }
            )
         }}
        className="flex flex-coloumn justify-between my-5">
          <input required type="text" placeholder="Home-Score" onChange={(e)=>setHomeScore(e.target.value)} className="p-2 h-10 border rounded-lg"/>
          <input required type="text" placeholder="Away-Score" onChange={(e)=>setAwayScore(e.target.value)} className="p-2 h-10 border rounded-lg"/>
          <Button type="submit">{loading ? "updating..." : "Send Score"}</Button>
        </form>
        {error && <p className="text-red-500">{'Error occured try again'}</p>}
      </div>
      <div>
        <p>Send Notfication</p>
        <form
        onSubmit={(e)=>{
          e.preventDefault()
          sendNotification({
            title:notificationTitle,
            body:notificationMessage
          })
        }}
        className="flex flex-coloumn justify-between my-5">
            <input required type="text" placeholder="Notification Title" onChange={(e)=>setNotificationTitle(e.target.value)} className="p-2 h-10 border rounded-lg"/>
            <input required type="text" placeholder="Notification Message" onChange={(e)=>setNotificationMessage(e.target.value)} className="p-2 h-10 border rounded-lg"/>
            <Button type="submit">Send Notification</Button>
        </form>
      </div>
    </div>
}