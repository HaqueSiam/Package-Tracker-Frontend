// === File: COURIER-TRAKER/src/PackageDetail.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
function PackageDetail({ id, onClose }) {
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/packages/${id}`)
      .then(res => setPkg(res.data))
      .catch(err => console.error('Failed to fetch package details', err));
  }, [id]);

  if (!pkg) return null;

  return (
    <div className="mt-8 p-6 bg-white border rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">📦 Package {pkg.package_id} Timeline</h2>
        <button onClick={onClose} className="text-red-500 font-semibold">✖ Close</button>
      </div>
      <ul className="list-disc pl-6 text-sm">
        {pkg.events.map((e, i) => (
          <li key={i} className="mb-1">
            <span className="font-semibold">{new Date(e.event_timestamp).toLocaleString()}</span>: {e.status} {e.note && <em>({e.note})</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackageDetail;