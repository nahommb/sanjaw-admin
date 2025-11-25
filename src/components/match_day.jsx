import { Button } from "@mui/material";

export function MatchDay() {
  const matches = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {/* Create Match Day */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <p className="font-semibold text-lg mb-4">Create Match Day</p>

        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <div className="flex flex-col"> */}
            {/* <label className="text-sm font-medium">Match Date</label> */}
            <input
              type="date"
              className="p-2 border rounded-md outline-none"
            />
          {/* </div> */}

          <input
            type="text"
            placeholder="Home team"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            placeholder="Away team"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            placeholder="Competition Type"
            className="p-2 border rounded-md outline-none"
          />

          <input
            type="text"
            placeholder="Venue"
            className="p-2 border rounded-md outline-none"
          />

          <div className="sm:col-span-2 lg:col-span-3 flex justify-start">
            <Button variant="contained" color="primary">
              Create
            </Button>
          </div>
        </form>
      </div>

      {/* Match List */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-4">Edit Matches</h1>

        <div className="space-y-3">
          {matches.map((match, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between 
                         border p-3 rounded-md bg-gray-50 shadow-sm"
            >
              <p className="font-medium text-gray-700">
                {match}. St George vs Hawassa City
              </p>

              <div className="mt-3 sm:mt-0 flex gap-2">
                <Button variant="outlined">Edit</Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
