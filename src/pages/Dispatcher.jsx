import React from 'react';
import DispatcherForm from '../components/DispatcherForm.jsx';

export default function Dispatcher() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Package Create Form</h2>
      <DispatcherForm />
    </div>
  );
}
