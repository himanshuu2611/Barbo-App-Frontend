import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toUpperCase();

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 Role-based access
  if (role) {
    const allowedRoles = Array.isArray(role)
      ? role.map(r => r.toUpperCase())
      : [role.toUpperCase()];

    if (!allowedRoles.includes(userRole)) {
      // 👉 Better UX: redirect based on role
      if (userRole === "ROLE_ADMIN") {
        return <Navigate to="/admin" replace />;
      }
      return <Navigate to="/barbers" replace />;
    }
  }

  return children;
}
