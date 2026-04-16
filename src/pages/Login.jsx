import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // 🔥 Validation
    if (!email || !password) {
      alert("Enter email & password ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/login", { email, password });

      // 🔥 Store data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      alert("Login successful ✅");

      const role = res.data.role?.toUpperCase();

      // 🔥 Flexible role check
      if (role.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/barbers");
      }

    } catch {
      alert("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 text-white border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Barbo ✂️
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-purple-600 py-2 rounded-lg font-bold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}