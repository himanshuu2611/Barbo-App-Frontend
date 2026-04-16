import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function MyBookings() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    API.get(`/user/appointments/my/${userId}`)
      .then(res => setAppointments(res.data))
      .catch(() => toast.error("Error loading bookings ❌"))
      .finally(() => setLoading(false));
  }, [userId]);

  // 🔥 CANCEL BOOKING
  const cancelBooking = async (id) => {
    try {
      await API.patch(`/user/appointments/${id}/cancel`);

      toast.success("Booking cancelled ❌");

      // update UI
      setAppointments(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status: "CANCELLED" } : a
        )
      );

    } catch {
      toast.error("Cancel failed ❌");
    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  // 🔥 EMPTY STATE
  if (appointments.length === 0) {
    return <p className="p-6">No bookings yet 😢</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      <div className="grid grid-cols-2 gap-4">
        {appointments.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow">

            {/* 🔥 Replace IDs later */}
            {/* <h2 className="font-bold">
              Service: {a.serviceId}
            </h2>

            <p>📅 {a.date}</p>
            <p>⏰ {a.timeSlot}</p>

            <p className="text-gray-500 text-sm">
              Barber: {a.barberId}
            </p> */}
            <h2 className="font-bold">
              Service: {a.serviceName}
            </h2>

            <p>📅 {a.date}</p>
            <p>⏰ {a.timeSlot}</p>

            <p className="text-gray-500 text-sm">
              Barber: {a.barberShopName}
            </p>

            {/* 🔥 STATUS */}
            <p className={`mt-2 font-semibold ${
              a.status === "CANCELLED" ? "text-red-500" : "text-green-500"
            }`}>
              {a.status}
            </p>

            {/* 🔥 CANCEL BUTTON */}
            {a.status !== "CANCELLED" && (
              <button
                onClick={() => cancelBooking(a.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}