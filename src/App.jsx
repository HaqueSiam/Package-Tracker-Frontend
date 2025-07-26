import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Courier from './pages/Courier.jsx';
import Dispatcher from './pages/Dispatcher.jsx';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-6 pb-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/dispatcher" element={<Dispatcher />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
