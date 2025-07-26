import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function PackageDetail({ id, onClose }) {
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/packages/${id}`)
      .then(res => setPkg(res.data))
      .catch(console.error);
  }, [id]);

  if (!pkg) return null;

  return (
    <div className="bg-white rounded shadow p-6 my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">📦 Timeline for {pkg.package_id}</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-lg">✖</button>
      </div>

      <ul className="list-disc pl-5 text-gray-700">
        {pkg.events.map((e, i) => (
          <li key={i} className="py-1">
            <span className="font-semibold text-blue-600">
              {new Date(e.event_timestamp).toLocaleString()}
            </span>
            : {e.status}
            {e.note && <span className="text-sm text-gray-500"> ({e.note})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
