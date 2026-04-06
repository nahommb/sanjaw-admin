import { Button, Pagination } from "@mui/material";
import { useContext, useEffect ,useState } from "react";
import { MatchDayContext } from "../context/match_dayContext.jsx";



export function MatchDay() {
  const matches = [1, 2, 3, 4, 5, 6, 7];

  const { createMatchDay, getMatchDay, matchDays, loading, error } = useContext(MatchDayContext);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
   getMatchDay(1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMatchDay({
      home_team: homeTeam,
      away_team: awayTeam,
      match_date: matchDate,
      event_type: eventType,
      venue: venue
    });
  }

  function onPageChange (event, value) {
    console.log(value);
    getMatchDay(value);
  }

  return (
    <>
      {/* Create Match Day */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <p className="font-semibold text-lg mb-4">Create Match Day</p>

        <form onSubmit={handleSubmit}
         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <div className="flex flex-col"> */}
            {/* <label className="text-sm font-medium">Match Date</label> */}
            <input
              type="date"
              onChange={(e)=>setMatchDate(e.target.value)}
              className="p-2 border rounded-md outline-none"
            />
          {/* </div> */}

          <input
            type="text"
            onChange={(e)=>setHomeTeam(e.target.value)}
            placeholder="Home team"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            onChange={(e)=>setAwayTeam(e.target.value)}
            placeholder="Away team"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            onChange={(e)=>setEventType(e.target.value)}
            placeholder="Competition Type"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            onChange={(e)=>setVenue(e.target.value)}
            placeholder="Venue"
            className="p-2 border rounded-md outline-none"
          />

          <div className="sm:col-span-2 lg:col-span-3 flex justify-start">
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </div>
        </form>
      </div>

      {/* Match List */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-4">Edit Matches</h1>

        <div className="space-y-3 mb-4">
          {matchDays?.map((match, index) => (

             
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between 
                         border p-3 rounded-md bg-gray-50 shadow-sm"
            >
              <p className="font-medium text-gray-700">
                {match.home_team} Vs {match.away_team} - {match.event_type}
              </p>
              <p>{ new Date(match.match_date).toDateString()}</p>
              <p>{match.venue}</p>
              <div className="mt-3 sm:mt-0 flex gap-2">
                <Button variant="outlined">Edit</Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Pagination onChange={onPageChange} count={10} />
      </div>
    </>
  );
}
