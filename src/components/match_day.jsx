import { Button } from "@mui/material"

export function MatchDay(){

    const matches = [
        1,2,3,4,5,6,7
    ]
    
    return <>  
      <div className="mt-4">
        <p>Create Match Day</p>
        <form className="flex  my-8">
         <label className="mr-4">Match date</label>
         <input type="date" />
         <input type="text" placeholder="Home team"/>
         <input type="text" placeholder="Away team"/>
         <input type="text" placeholder="Comptition Type"/>
         <input type="text" placeholder="Venue"/>
         <Button>Create</Button>
        </form>
      </div>
      <div>
        <h1 className="my-4">Edit Match</h1>
        {matches.map((match,index)=><div key={index} className="flex flex-row ">
            <p>{match} St George Vs Hawassa City</p>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </div>)}
      </div>
    </>
}