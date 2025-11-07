
export default function AdminNavbar() {

 

  return (
    <div className="p-4 text-orange shadow-lg shadow-gray-400 bg-white rounded-lg fixed w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xxl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
            {/* <p>{user.email}</p> */}
          <button className="bg-orange px-2 py-0.5 text-white rounded-lg hover:bg-red-700">Logout</button>
        </div>
      </div>
    </div>
  );
}