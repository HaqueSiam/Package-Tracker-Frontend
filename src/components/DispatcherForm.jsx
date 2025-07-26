// === File: src/components/DispatcherForm.jsx ===
import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function DispatcherForm() {
  const [form, setForm] = useState({
    package_id: '',
    lat: '',
    lon: '',
    note: '',
    eta: '',
    secret: ''
  });
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        status: 'CREATED', // 🚨 Add this always for dispatcher
      };
      await axios.post(`${API_URL}/api/packages/create`, payload);
      setMsg('✅ Package created successfully');
      setForm({ package_id: '', lat: '', lon: '', note: '', eta: '', secret: '' });
    } catch (err) {
      setMsg(err.response?.data?.error || '❌ Error');
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-blue-700 mb-2">📦 Package Create Form</h2>

      {msg && <div className="text-green-700 font-semibold">{msg}</div>}

      <input
        type="text"
        placeholder="Package ID"
        value={form.package_id}
        onChange={e => setForm({ ...form, package_id: e.target.value })}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        step="any"
        placeholder="Latitude"
        value={form.lat}
        onChange={e => setForm({ ...form, lat: e.target.value })}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        step="any"
        placeholder="Longitude"
        value={form.lon}
        onChange={e => setForm({ ...form, lon: e.target.value })}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={form.note}
        onChange={e => setForm({ ...form, note: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="ETA (optional)"
        value={form.eta}
        onChange={e => setForm({ ...form, eta: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Secret Key"
        value={form.secret}
        onChange={e => setForm({ ...form, secret: e.target.value })}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
