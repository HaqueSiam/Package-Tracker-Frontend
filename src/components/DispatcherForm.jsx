import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function DispatcherForm() {
  const [form, setForm] = useState({
    package_id: '', lat: '', lon: '', note: '', eta: '', secret: ''
  });
  const [msg, setMsg] = useState(null);

  const trimForm = (formData) => {
    const trimmed = {};
    for (const key in formData) {
      trimmed[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    }
    return trimmed;
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...trimForm(form),
        status: 'CREATED'
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
      {msg && <div className="text-green-700">{msg}</div>}

      {['package_id', 'lat', 'lon', 'note', 'eta', 'secret'].map((field) => (
        <input key={field}
          name={field}
          placeholder={field === 'eta' ? 'ETA (optional)' : field.replace('_', ' ').toUpperCase()}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          required={field !== 'note' && field !== 'eta'}
          className="w-full border px-3 py-2 rounded"
        />
      ))}

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}
