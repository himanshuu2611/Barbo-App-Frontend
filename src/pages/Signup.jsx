import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    // 🔥 Validation
    if (!user.name || !user.email || !user.password) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      await API.post("/users", {
        ...user,
        role: "ROLE_USER"
      });

      alert("Account created ✅");

      navigate("/login"); // 🔥 better UX than "/"
    } catch (err) {
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white border border-white/20">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account ✂️
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-3 rounded bg-white/20 placeholder-gray-200 focus:outline-none"
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 rounded bg-white/20 placeholder-gray-200 focus:outline-none"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-white/20 placeholder-gray-200 focus:outline-none"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full bg-white text-purple-600 py-2 rounded font-bold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        {/* 🔥 Login redirect */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}