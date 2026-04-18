import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Barbers from "./pages/Barbers";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";

function App() {
  const location = useLocation();

  // ✅ Hide navbar only on auth pages
  const hideNavbarRoutes = ["/login", "/signup"];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>

        {/* 🔐 AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 👤 USER + ADMIN (Shared Access) */}
        <Route
          path="/barbers"
          element={
            <PrivateRoute role={["ROLE_USER", "ROLE_ADMIN"]}>
              <Barbers />
            </PrivateRoute>
          }
        />

        <Route
          path="/services/:barberId"
          element={
            <PrivateRoute role={["ROLE_USER", "ROLE_ADMIN"]}>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <PrivateRoute role={["ROLE_USER", "ROLE_ADMIN"]}>
              <Booking />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute role={["ROLE_USER", "ROLE_ADMIN"]}>
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* 👨‍💼 ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminPanel />
            </PrivateRoute>
          }
        />

        {/* 🏠 DEFAULT ROUTE */}
        <Route path="/" element={<Login />} />

        {/* ❌ 404 */}
        <Route path="*" element={<h1 className="p-6">Page Not Found 😢</h1>} />

      </Routes>
    </div>
  );
}

export default App;
