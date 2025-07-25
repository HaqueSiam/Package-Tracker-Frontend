import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageDetail from './PackageDetail';
import CourierForm from './CourierForm';
import AlertList from './AlertList';

function App() {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ACTIVE');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPackages();
    const interval = setInterval(fetchPackages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/packages');
      setPackages(res.data);
    } catch (err) {
      console.error('Fetch failed', err);
    }
  };

  const filtered = packages.filter(pkg =>
    (filter === 'ALL' || (pkg.current_status !== 'DELIVERED' && pkg.current_status !== 'CANCELLED')) &&
    pkg.package_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-6">📦 Aamira Package Tracker</h1>

      <CourierForm />
      <AlertList packages={packages} />

      <div className="flex justify-between items-center max-w-4xl mx-auto mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Package ID"
          className="border px-4 py-2 rounded w-1/2"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded">
          <option value="ACTIVE">Active</option>
          <option value="ALL">All</option>
        </select>
      </div>

      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Package ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Last Seen</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pkg, i) => {
              const isStuck = Date.now() - new Date(pkg.last_updated) > 30 * 60 * 1000;
              return (
                <tr key={pkg.package_id}
                  className={`cursor-pointer ${isStuck ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelected(pkg.package_id)}>
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
      </div>

      {selected && <PackageDetail id={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
