// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function AdminPanel() {
//   const [barbers, setBarbers] = useState([]);
//   const [services, setServices] = useState([]);

//   const [barber, setBarber] = useState({});
//   const [service, setService] = useState({});

//   const [editingBarberId, setEditingBarberId] = useState(null);
//   const [editingServiceId, setEditingServiceId] = useState(null);

//   // 🔥 Load Data
//   useEffect(() => {
//     loadBarbers();
//     loadServices();
//   }, []);

//   const loadBarbers = async () => {
//     const res = await API.get("/barbers");
//     setBarbers(res.data);
//   };

//   const loadServices = async () => {
//     const res = await API.get("/services");
//     setServices(res.data);
//   };

//   // ================= BARBER =================

//   const addOrUpdateBarber = async () => {
//     try {
//       if (editingBarberId) {
//         await API.put(`/admin/barbers/${editingBarberId}`, barber);
//         alert("Barber updated ✅");
//       } else {
//         await API.post("/admin/barbers", barber);
//         alert("Barber added ✅");
//       }

//       setBarber({});
//       setEditingBarberId(null);
//       loadBarbers();
//     } catch {
//       alert("Error saving barber");
//     }
//   };

//   const editBarber = (b) => {
//     setBarber(b);
//     setEditingBarberId(b.id);
//   };

//   const deleteBarber = async (id) => {
//     if (!window.confirm("Delete barber?")) return;

//     await API.delete(`/admin/barbers/${id}`);
//     loadBarbers();
//   };

//   // ================= SERVICE =================

//   const addOrUpdateService = async () => {
//     try {
//       if (editingServiceId) {
//         await API.put(`/admin/services/${editingServiceId}`, service);
//         alert("Service updated ✅");
//       } else {
//         await API.post("/admin/services", service);
//         alert("Service added ✅");
//       }

//       setService({});
//       setEditingServiceId(null);
//       loadServices();
//     } catch {
//       alert("Error saving service");
//     }
//   };

//   const editService = (s) => {
//     setService(s);
//     setEditingServiceId(s.id);
//   };

//   const deleteService = async (id) => {
//     if (!window.confirm("Delete service?")) return;

//     await API.delete(`/admin/services/${id}`);
//     loadServices();
//   };

//   // ================= UI =================

//   return (
//     <div className="p-6 space-y-10">

//       {/* ================= BARBER SECTION ================= */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-4">
//           {editingBarberId ? "Update Barber" : "Add Barber"}
//         </h2>

//         <input
//           placeholder="Name"
//           className="input"
//           value={barber.name || ""}
//           onChange={e => setBarber({ ...barber, name: e.target.value })}
//         />

//         <input
//           placeholder="Shop Name"
//           className="input"
//           value={barber.shopName || ""}
//           onChange={e => setBarber({ ...barber, shopName: e.target.value })}
//         />

//         <input
//           placeholder="City"
//           className="input"
//           value={barber.city || ""}
//           onChange={e => setBarber({ ...barber, city: e.target.value })}
//         />

//         <button
//           onClick={addOrUpdateBarber}
//           className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
//         >
//           {editingBarberId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* BARBER LIST */}
//       <div className="grid grid-cols-3 gap-4">
//         {barbers.map(b => (
//           <div key={b.id} className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="font-bold">{b.name}</h3>
//             <p>{b.shopName}</p>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => editBarber(b)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteBarber(b.id)}
//                 className="bg-red-600 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= SERVICE SECTION ================= */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-4">
//           {editingServiceId ? "Update Service" : "Add Service"}
//         </h2>

//         <input
//           placeholder="Service Name"
//           className="input"
//           value={service.name || ""}
//           onChange={e => setService({ ...service, name: e.target.value })}
//         />

//         <input
//           placeholder="Price"
//           className="input"
//           value={service.price || ""}
//           onChange={e => setService({ ...service, price: e.target.value })}
//         />

//         <input
//           placeholder="Duration"
//           className="input"
//           value={service.duration || ""}
//           onChange={e => setService({ ...service, duration: e.target.value })}
//         />

//         {/* 🔥 Select Barber */}
//         <select
//           className="input"
//           value={service.barberId || ""}
//           onChange={e => setService({ ...service, barberId: e.target.value })}
//         >
//           <option value="">Select Barber</option>
//           {barbers.map(b => (
//             <option key={b.id} value={b.id}>
//               {b.name}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={addOrUpdateService}
//           className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
//         >
//           {editingServiceId ? "Update" : "Add"}
//         </button>
//       </div>

//       {/* SERVICE LIST */}
//       <div className="grid grid-cols-3 gap-4">
//         {services.map(s => (
//           <div key={s.id} className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="font-bold">{s.name}</h3>
//             <p>₹ {s.price}</p>
//             <p>{s.duration} min</p>

//             {/* Show Barber Name */}
//             <p className="text-sm text-gray-500">
//               Barber: {barbers.find(b => b.id === s.barberId)?.name || "N/A"}
//             </p>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => editService(s)}
//                 className="bg-yellow-500 text-white px-2 py-1 rounded"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteService(s.id)}
//                 className="bg-red-600 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminPanel() {

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [barber, setBarber] = useState({});
  const [service, setService] = useState({});

  const [editingBarberId, setEditingBarberId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    loadBarbers();
    loadServices();
    loadAppointments(); // 🔥 NEW
  }, []);

  const loadBarbers = async () => {
    const res = await API.get("/barbers");
    setBarbers(res.data);
  };

  const loadServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  const loadAppointments = async () => {
    try {
      const res = await API.get("/admin/appointments");
      setAppointments(res.data);
    } catch {
      alert("Error loading appointments");
    }
  };

  // ================= BARBER =================

  const addOrUpdateBarber = async () => {
    try {
      if (editingBarberId) {
        await API.put(`/admin/barbers/${editingBarberId}`, barber);
        alert("Barber updated ✅");
      } else {
        await API.post("/admin/barbers", barber);
        alert("Barber added ✅");
      }

      setBarber({});
      setEditingBarberId(null);
      loadBarbers();
    } catch {
      alert("Error saving barber");
    }
  };

  const editBarber = (b) => {
    setBarber(b);
    setEditingBarberId(b.id);
  };

  const deleteBarber = async (id) => {
    if (!window.confirm("Delete barber?")) return;
    await API.delete(`/admin/barbers/${id}`);
    loadBarbers();
  };

  // ================= SERVICE =================

  const addOrUpdateService = async () => {
    try {
      if (editingServiceId) {
        await API.put(`/admin/services/${editingServiceId}`, service);
        alert("Service updated ✅");
      } else {
        await API.post("/admin/services", service);
        alert("Service added ✅");
      }

      setService({});
      setEditingServiceId(null);
      loadServices();
    } catch {
      alert("Error saving service");
    }
  };

  const editService = (s) => {
    setService(s);
    setEditingServiceId(s.id);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete service?")) return;
    await API.delete(`/admin/services/${id}`);
    loadServices();
  };

  // ================= UPDATE APPOINTMENT STATUS =================

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/appointments/${id}/status?status=${status}`);
      alert("Status updated ✅");

      setAppointments(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status } : a
        )
      );
    } catch {
      alert("Update failed ❌");
    }
  };

  // ================= UI =================

  return (
    <div className="p-6 space-y-10">

      {/* ================= BARBER ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          {editingBarberId ? "Update Barber" : "Add Barber"}
        </h2>

        <input placeholder="Name" className="input"
          value={barber.name || ""}
          onChange={e => setBarber({ ...barber, name: e.target.value })}
        />

        <input placeholder="Shop Name" className="input"
          value={barber.shopName || ""}
          onChange={e => setBarber({ ...barber, shopName: e.target.value })}
        />

        <input placeholder="City" className="input"
          value={barber.city || ""}
          onChange={e => setBarber({ ...barber, city: e.target.value })}
        />

        <button onClick={addOrUpdateBarber}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
          {editingBarberId ? "Update" : "Add"}
        </button>
      </div>

      {/* BARBER LIST */}
      <div className="grid grid-cols-3 gap-4">
        {barbers.map(b => (
          <div key={b.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold">{b.name}</h3>
            <p>{b.shopName}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => editBarber(b)}
                className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </button>

              <button onClick={() => deleteBarber(b.id)}
                className="bg-red-600 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SERVICE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          {editingServiceId ? "Update Service" : "Add Service"}
        </h2>

        <input placeholder="Service Name" className="input"
          value={service.name || ""}
          onChange={e => setService({ ...service, name: e.target.value })}
        />

        <input placeholder="Price" className="input"
          value={service.price || ""}
          onChange={e => setService({ ...service, price: e.target.value })}
        />

        <input placeholder="Duration" className="input"
          value={service.duration || ""}
          onChange={e => setService({ ...service, duration: e.target.value })}
        />

        <select className="input"
          value={service.barberId || ""}
          onChange={e => setService({ ...service, barberId: e.target.value })}
        >
          <option value="">Select Barber</option>
          {barbers.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <button onClick={addOrUpdateService}
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
          {editingServiceId ? "Update" : "Add"}
        </button>
      </div>

      {/* SERVICE LIST */}
      <div className="grid grid-cols-3 gap-4">
        {services.map(s => (
          <div key={s.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold">{s.name}</h3>
            <p>₹ {s.price}</p>

            <p className="text-sm text-gray-500">
              Barber: {barbers.find(b => b.id === s.barberId)?.name || "N/A"}
            </p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => editService(s)}
                className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </button>

              <button onClick={() => deleteService(s.id)}
                className="bg-red-600 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= APPOINTMENTS ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">All Appointments</h2>

        <div className="grid gap-4">
          {appointments.map(a => (
            <div key={a.id} className="p-4 border rounded-lg">

              <h3 className="font-bold">{a.serviceName}</h3>
              <p>{a.barberShopName}</p>
              <p>📅 {a.date} | ⏰ {a.timeSlot}</p>

              <p className="font-semibold mt-2">{a.status}</p>

              <div className="flex gap-2 mt-3">

                {a.status?.toUpperCase() === "BOOKED" && (
  <div className="flex gap-2">

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
)}

{a.status?.toUpperCase() === "CONFIRMED" && (
  <button
    onClick={() => updateStatus(a.id, "COMPLETED")}
    className="bg-green-500 text-white px-3 py-1 rounded"
  >
    Complete
  </button>
)}

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}