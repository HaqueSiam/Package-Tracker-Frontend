import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageDetail from '../components/PackageDetail.jsx';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const [filter, setFilter] = useState('ACTIVE');
  const [search, setSearch] = useState('');

  const fetch = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/packages`);
      setPackages(res.data);
      const stuck = res.data.find(p => Date.now() - new Date(p.last_updated) > 1800000 && !p.is_stuck);
      if (stuck) setAlertMsg(`Package ${stuck.package_id} might be stuck`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
    const iv = setInterval(fetch, 5000);
    return () => clearInterval(iv);
  }, []);

  const filtered = packages.filter(pkg => {
    const matchStatus = filter === 'ALL' || (pkg.current_status !== 'DELIVERED' && pkg.current_status !== 'CANCELLED');
    const matchSearch = pkg.package_id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Aamira Package Tracker</h2>
      <div className="mb-4 flex gap-4">
        <input placeholder="Search by Package ID" value={search} onChange={e=>setSearch(e.target.value)} className="input max-w-xs"/>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="input max-w-xs">
          <option value="ACTIVE">ACTIVE</option>
          <option value="ALL">ALL</option>
        </select>
      </div>
      {alertMsg && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mb-4 flex justify-between">
          <span>{alertMsg}</span>
          <button onClick={() => setAlertMsg(null)} className="font-bold">×</button>
        </div>
      )}
      <table className="w-full bg-white rounded shadow overflow-x-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th>Package ID</th>
            <th>Status</th>
            <th>Last Seen</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((pkg, i) => {
            const isStuck = Date.now() - new Date(pkg.last_updated) > 1800000;
            return (
              <tr key={pkg.package_id} onClick={() => setSelected(pkg.package_id)}
                className={`hover:bg-gray-100 cursor-pointer ${isStuck ? 'bg-red-100' : ''}`}>
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-semibold">{pkg.package_id}</td>
                <td className="px-4 py-2">{pkg.current_status}</td>
                <td className="px-4 py-2">{Math.floor((Date.now() - new Date(pkg.last_updated)) / 60000)} min ago</td>
                <td className="px-4 py-2">{pkg.lat}, {pkg.lon}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selected && <PackageDetail id={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
