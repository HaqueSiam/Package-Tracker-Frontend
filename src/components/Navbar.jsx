import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-800">📦 Aamira Tracker</h1>
      <div className="space-x-6 text-lg">
        <NavLink to="/" end className={({isActive})=>isActive?'text-blue-700 font-semibold':'text-gray-600'}>Home</NavLink>
        <NavLink to="/courier" className={({isActive})=>isActive?'text-blue-700 font-semibold':'text-gray-600'}>Courier</NavLink>
        <NavLink to="/dispatcher" className={({isActive})=>isActive?'text-blue-700 font-semibold':'text-gray-600'}>Dispatcher</NavLink>
      </div>
    </nav>
  );
}
