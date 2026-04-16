import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/api";
import emailjs from "emailjs-com";
import { sendBookingEmail } from "../utils/emailService";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const service = state?.service;

  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [date, setDate] = useState("");

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM"
  ];

  // 🔥 FETCH BOOKED SLOTS
  useEffect(() => {
    if (!date || !service) return;

    API.get(`/user/appointments/barber/${service.barberId}`)
      .then(res => {
        const booked = res.data
          .filter(a => a.date === date)
          .map(a => a.timeSlot);

        setBookedSlots(booked);
      })
      .catch(() => alert("Error loading slots ❌"));
  }, [date, service]);

  // 🔥 BOOK APPOINTMENT
  const book = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    if (!userId) {
      alert("User not found ❌");
      return;
    }

    if (!selectedSlot || !date) {
      alert("Select date & slot ❌");
      return;
    }

    try {
      // ✅ 1. BOOK APPOINTMENT
      await API.post("/user/appointments", {
        userId: userId,
        barberId: service.barberId,
        serviceId: service.id,
        price: service.price,
        date,
        timeSlot: selectedSlot
      });

     
      await sendBookingEmail({
        date: date,
        time: selectedSlot,
        service: service.name,
        barber: service.barberName
      });

      alert("Booked Successfully ✅");

      // ✅ 3. UPDATE UI
      setBookedSlots(prev => [...prev, selectedSlot]);
      setSelectedSlot("");

      // ✅ 4. REDIRECT
      navigate("/my-bookings");

    } catch (err) {
      if (err.response?.status === 409) {
        alert("Slot already booked ❌");
      } else {
        alert("Slot is already booked ❌");
      }
      console.log(err);
    }
  };

  if (!service) {
    return <p className="p-6">No service selected ❌</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-xl">

      {/* SERVICE INFO */}
      <h2 className="text-xl font-bold mb-2">{service.name}</h2>
      <p>₹ {service.price} • {service.duration} min</p>

      {/* DATE */}
      <input
        type="date"
        className="input mt-4 w-full"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      {/* SLOTS */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {slots.map(slot => {
          const isBooked = bookedSlots.includes(slot);

          return (
            <button
              key={slot}
              disabled={isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded text-sm ${
                isBooked
                  ? "bg-gray-300 cursor-not-allowed"
                  : selectedSlot === slot
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* BOOK BUTTON */}
      <button
        onClick={book}
        className="mt-6 bg-black text-white px-6 py-2 rounded w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
}