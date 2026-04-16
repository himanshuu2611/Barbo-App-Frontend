import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function AdminBookings() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("/admin/appointments")
      .then(res => setAppointments(res.data))
      .catch(() => toast.error("Error loading"));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/appointments/${id}/status?status=${status}`);

      toast.success("Updated ✅");

      setAppointments(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status } : a
        )
      );
    } catch {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="grid gap-4">
        {appointments.map(a => (
          <div key={a.id} className="p-4 bg-white shadow rounded-xl border">

            <h2 className="font-bold">{a.serviceName}</h2>
            <p>{a.barberShopName}</p>
            <p>📅 {a.date} | ⏰ {a.timeSlot}</p>

            <p className="font-semibold mt-2">{a.status}</p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(a.id, "CONFIRMED")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => updateStatus(a.id, "COMPLETED")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Complete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}