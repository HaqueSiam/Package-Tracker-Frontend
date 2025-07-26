// === File: COURIER-TRAKER/src/App.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageDetail from './PackageDetail';
import CourierForm from './CourierForm';
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ACTIVE');
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchPackages();
    const interval = setInterval(fetchPackages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/packages`);
      //const res = await axios.get('http://localhost:5000/api/packages');
      setPackages(res.data);
    } catch (err) {
      console.error('Failed to fetch packages', err);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    if (filter === 'ACTIVE') {
      return pkg.current_status !== 'DELIVERED' && pkg.current_status !== 'CANCELLED';
    }
    return true;
  }).filter(pkg => pkg.package_id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">📦 Aamira Package Tracker</h1>

      {alert && (
        <div className="bg-red-200 text-red-900 px-4 py-2 rounded flex justify-between items-center mb-4">
          <span>{alert}</span>
          <button onClick={() => setAlert(null)} className="font-bold">×</button>
        </div>
      )}

      <CourierForm setAlert={setAlert} fetchPackages={fetchPackages} />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Package ID"
          className="w-full sm:w-1/3 border border-gray-300 px-4 py-2 rounded shadow-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/4 border border-gray-300 px-4 py-2 rounded shadow-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="ALL">All</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-6 py-3">#</th>
              <th className="text-left px-6 py-3">Package ID</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Last Seen</th>
              <th className="text-left px-6 py-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg, index) => {
              const isStuck = Date.now() - new Date(pkg.last_updated).getTime() > 1800000;
              return (
                <tr
                  key={pkg.package_id}
                  onClick={() => setSelected(pkg.package_id)}
                  className={`cursor-pointer ${isStuck ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'}`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 font-semibold">{pkg.package_id}</td>
                  <td className="px-6 py-3">{pkg.current_status}</td>
                  <td className="px-6 py-3">{Math.floor((Date.now() - new Date(pkg.last_updated).getTime()) / 60000)} min ago</td>
                  <td className="px-6 py-3">{pkg.lat}, {pkg.lon}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && <PackageDetail id={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
