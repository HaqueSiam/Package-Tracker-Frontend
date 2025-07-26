// === File: COURIER-TRAKER/src/CourierForm.jsx ===
import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const statuses = [
  'CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'EXCEPTION', 'CANCELLED'
];

function CourierForm({ setAlert, fetchPackages }) {
  const [form, setForm] = useState({
    package_id: '', status: '', lat: '', lon: '', note: '', eta: '', secret: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/packages/update`, form);
      setAlert('Package updated successfully.');
      setForm({ package_id: '', status: '', lat: '', lon: '', note: '', eta: '', secret: '' });
      fetchPackages();
    } catch (err) {
      setAlert(err.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Package ID" value={form.package_id} onChange={e => setForm({ ...form, package_id: e.target.value })} required className="border px-3 py-2 rounded" />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required className="border px-3 py-2 rounded">
          <option value="">Select Status</option>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input type="number" step="any" placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} required className="border px-3 py-2 rounded" />
        <input type="number" step="any" placeholder="Longitude" value={form.lon} onChange={e => setForm({ ...form, lon: e.target.value })} required className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="ETA (optional)" value={form.eta} onChange={e => setForm({ ...form, eta: e.target.value })} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="Secret Key" value={form.secret} onChange={e => setForm({ ...form, secret: e.target.value })} required className="border px-3 py-2 rounded" />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">Submit Update</button>
    </form>
  );
}

export default CourierForm;