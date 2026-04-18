import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = role?.toUpperCase().includes("ROLE_ADMIN");
  
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1
          className="text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          Barbo ✂️
        </h1>

        {/* Links */}
        <div className="flex gap-6 text-lg items-center">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/barbers" className="hover:text-gray-200">
            Barbers
          </Link>

          <Link to="/my-bookings" className="hover:text-gray-200">
            My Bookings
          </Link>

          {/* 🔥 Admin Only */}
          {isAdmin && (
            <Link to="/admin" className="hover:text-yellow-300">
              Admin
            </Link>
          )}

          {/* 🔥 Auth Section */}
          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>

              <Link to="/signup" className="hover:text-gray-200">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
