import React from 'react';
import CourierForm from '../components/CourierForm.jsx';

export default function Courier() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Package Update Form</h2>
      <CourierForm />
    </div>
  );
}
