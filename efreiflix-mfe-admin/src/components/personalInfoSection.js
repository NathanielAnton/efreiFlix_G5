import React, { useState, useEffect } from 'react';

const PersonalInfoSection = ({ user, onUpdatePersonalInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);

    const hasChanges = 
      newFormData.name !== user.name ||
      newFormData.email !== user.email ||
      newFormData.bio !== user.bio;
    
    setIsModified(hasChanges);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePersonalInfo(formData);
    setIsModified(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-netflixRed">Informations personnelles</h2>
        {isModified && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sauvegarder
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-netflixRed focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-netflixRed focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-netflixRed focus:border-transparent h-24"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Profils associés</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user?.profiles?.map(profile => (
            <div key={profile.id} className="flex items-center space-x-4 p-4 border rounded">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-gray-500">
                  {profile.child ? 'Profil enfant' : 'Profil adulte'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;