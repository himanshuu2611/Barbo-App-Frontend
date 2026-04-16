import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Barbers() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔥 Image Mapping
  const barberImages = {
    suraj: "/images/surajbarber.png",
    suresh: "/images/suresh.png",
  };

  useEffect(() => {
    API.get("/barbers")
      .then(res => setBarbers(res.data))
      .catch(() => alert("Error loading barbers"))
      .finally(() => setLoading(false));
  }, []);

  // 🔥 Loading State
  if (loading) {
    return <p className="p-6">Loading barbers...</p>;
  }

  // 🔥 Empty State
  if (barbers.length === 0) {
    return <p className="p-6">No barbers found 😢</p>;
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {barbers.map(b => {
        // ✅ FIX: first name only
        const firstName = b.name.split(" ")[0].toLowerCase();

        const image =
          barberImages[firstName] || "/images/barbers/default.jpg";

        return (
          <div
            key={b.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-xl hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/services/${b.id}`)}
          >
            <img
              src={image}
              className="w-full h-44 object-cover rounded-lg"
              alt={b.name}
            />

            <h2 className="text-xl font-bold mt-2">{b.name}</h2>

            <p className="text-gray-500">{b.shopName}</p>

            <p className="text-yellow-500 font-semibold">
              ⭐ {b.rating || 4.5}
            </p>
          </div>
        );
      })}
    </div>
  );
}