import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toUpperCase();

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔥 Role check (flexible)
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    const hasAccess = allowedRoles.some(r =>
      userRole?.includes(r.toUpperCase())
    );

    if (!hasAccess) {
      return <Navigate to="/" />;
    }
  }

  return children;
}