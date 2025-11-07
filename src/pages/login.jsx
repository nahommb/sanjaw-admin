

export default function Login() {


  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-orange font-bold text-lg mb-4">Login</h1>


      <form >
        <div className="flex flex-col space-y-4 bg-white h-80 items-center justify-center w-80 sm:w-96 rounded-lg p-4 shadow-lg shadow-gray-400">
          <input
            required
            type="email"
            placeholder="email"
            className="p-1 pl-2 rounded-lg border border-gray-500 text-orange w-64"
          />
          <input
            required
            type="password"
            
            placeholder="password"
            className="p-1 pl-2 rounded-lg border border-gray-500 text-orange w-64"
          />

          <button
            type="submit"
            className="bg-red-500 w-40 p-2 rounded-lg flex justify-center items-center hover:bg-green-500 disabled:opacity-50"
          >
          Login
          </button>
        </div>
      </form>
    </div>
  );
}
