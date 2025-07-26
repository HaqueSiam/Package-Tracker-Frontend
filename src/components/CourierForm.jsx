import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const statuses = ['PICKED_UP','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','EXCEPTION','CANCELLED'];

export default function CourierForm() {
  const [form, setForm] = useState({package_id:'', status:'', lat:'', lon:'', note:'', eta:'', secret:''});
  const [msg, setMsg] = useState(null);

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/packages/update`, form);
      setMsg('Update successful');
      setForm({package_id:'', status:'', lat:'', lon:'', note:'', eta:'', secret:''});
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error');
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
      {msg && <div className="text-green-700">{msg}</div>}
      <input name="package_id" value={form.package_id} onChange={e=>setForm({...form,package_id:e.target.value})}
        placeholder="Package ID" required className="input" />
      <select name="status" value={form.status}
        onChange={e=>setForm({...form,status:e.target.value})}
        required className="input">
        <option value="">Select Status</option>
        {statuses.map(s=><option key={s}>{s}</option>)}
      </select>
      <input name="lat" placeholder="Latitude" required value={form.lat}
        onChange={e=>setForm({...form,lat:e.target.value})} className="input" />
      <input name="lon" placeholder="Longitude" required value={form.lon}
        onChange={e=>setForm({...form,lon:e.target.value})} className="input" />
      <input name="note" placeholder="Note" value={form.note}
        onChange={e=>setForm({...form,note:e.target.value})} className="input" />
      <input name="eta" placeholder="ETA (optional ISO)" value={form.eta}
        onChange={e=>setForm({...form,eta:e.target.value})} className="input" />
      <input name="secret" placeholder="Secret key" required value={form.secret}
        onChange={e=>setForm({...form,secret:e.target.value})} className="input" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
