import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-black/5 backdrop-blur-sm p-6 rounded-lg hover:bg-black/10 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-red-600 p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );


export default FeatureCard;