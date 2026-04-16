import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Services() {
  const { barberId } = useParams();
  const [services, setServices] = useState([]);
  const [barber, setBarber] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [barberId]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [serviceRes, barberRes] = await Promise.all([
        API.get(`/services/barber/${barberId}`),
        API.get(`/barbers/${barberId}`)
      ]);

      setServices(serviceRes.data);
      setBarber(barberRes.data);

    } catch {
      alert("Error loading services ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Loading UI
  if (loading) {
    return <p className="p-6">Loading services...</p>;
  }

  // 🔥 Empty state
  if (services.length === 0) {
    return <p className="p-6">No services available 😢</p>;
  }

  return (
    <div className="p-6">

      {/* 🔥 Barber Info */}
      <h1 className="text-2xl font-bold mb-2">
        {barber?.name}
      </h1>
      <p className="text-gray-500 mb-6">
        {barber?.shopName}
      </p>

      {/* 🔥 Services Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map(s => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold">{s.name}</h2>

            <p className="text-gray-600 mt-1">
              ₹ {s.price}
            </p>

            <p className="text-sm text-gray-500">
              ⏱ {s.duration} min
            </p>

            {/* 🔥 Book Button */}
            <button
              onClick={() =>
                navigate("/booking", { state: { service: s } })
              }
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}