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

  // 🔥 Hide navbar on auth pages
  const hideNavbarRoutes = ["/", "/signup"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">

      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>

        {/* 🔐 Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 👤 USER */}
        <Route
          path="/barbers"
          element={
            <PrivateRoute role="USER">
              <Barbers />
            </PrivateRoute>
          }
        />

        <Route
          path="/services/:barberId"
          element={
            <PrivateRoute role="USER">
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute role={["USER", "ADMIN"]}>
              <MyBookings />
            </PrivateRoute>
          }
         />

        <Route
          path="/booking"
          element={
            <PrivateRoute role="USER">
              <Booking />
            </PrivateRoute>
          }
        />

        {/* 👨‍💼 ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <AdminPanel />
            </PrivateRoute>
          }
        />

        {/* ❌ 404 */}
        <Route path="*" element={<h1 className="p-6">Page Not Found 😢</h1>} />

      </Routes>
    </div>
  );
}

export default App;