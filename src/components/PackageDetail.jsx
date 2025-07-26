import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function PackageDetail({ id, onClose }) {
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/packages/${id}`)
      .then(r=>setPkg(r.data))
      .catch(console.error);
  }, [id]);

  if (!pkg) return null;

  return (
    <div className="bg-white rounded shadow p-6 my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Timeline for {pkg.package_id}</h2>
        <button onClick={onClose} className="text-red-500">✖</button>
      </div>
      <ul className="list-disc pl-5">
        {pkg.events.map((e,i)=>(
          <li key={i} className="py-1">
            <span className="font-semibold">{new Date(e.event_timestamp).toLocaleString()}</span>
             : {e.status} {e.note && `(${e.note})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
