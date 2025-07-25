import React, { useState } from 'react';
import axios from 'axios';

function CourierForm() {
  const [form, setForm] = useState({
    package_id: '',
    status: '',
    lat: '',
    lon: '',
    timestamp: '',
    note: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/packages/update', form, {
        headers: { 'x-api-key': 'secret123' } // replace with your real API key
      });
      alert('✅ Update sent!');
    } catch (err) {
      alert('❌ Error submitting update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg mb-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Courier Update Form</h2>
      {['package_id', 'status', 'lat', 'lon', 'timestamp', 'note'].map(key => (
        <input key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
          className="w-full border mb-3 px-3 py-2 rounded"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default CourierForm;
