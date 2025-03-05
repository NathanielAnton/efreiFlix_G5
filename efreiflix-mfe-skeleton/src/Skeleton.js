import React from 'react';
import './styles.css';

const Skeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skeleton MFE</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">
          This is a skeleton microfrontend that can be used as a template for creating new MFEs.
        </p>
      </div>
    </div>
  );
};

export default Skeleton; 