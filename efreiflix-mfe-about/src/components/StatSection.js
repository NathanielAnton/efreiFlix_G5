import React from 'react';

const StatSection = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">230M+</div>
                <div className="text-gray-600">Adhésions payantes</div>
            </div>
            <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">190+</div>
                <div className="text-gray-600">Pays</div>
            </div>
            <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">1700+</div>
                <div className="text-gray-600">Titres originaux</div>
            </div>
        </div>
);

export default StatSection;