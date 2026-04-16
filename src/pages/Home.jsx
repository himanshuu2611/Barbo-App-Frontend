import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">

      {/* 🔥 Title */}
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Barbo ✂️
      </h1>

      <p className="text-gray-600 mb-6">
        Book your favorite barber in seconds
      </p>

      {/* 🔥 Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/barbers")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View Barbers
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Home;