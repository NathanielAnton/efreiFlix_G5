import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Check } from 'lucide-react';

const ProfileManagementSection = ({ user, onUpdateUserData }) => {
  const [profiles, setProfiles] = useState(user.profiles || []);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeAvatarCategory, setActiveAvatarCategory] = useState('animals');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    child: false,
    email: '',
    avatar: 'https://robohash.org/efrei1?set=set4&size=200x200',
    lang: 'fr',
    watchlist: [],
    favorites: []
  });
  
  // Avatars regroupés par catégorie
  const avatarCategories = {
    animals: {
      name: 'Animaux',
      avatars: [
        'https://robohash.org/efrei1?set=set4&size=200x200',
        'https://robohash.org/efrei2?set=set4&size=200x200',
        'https://robohash.org/efrei3?set=set4&size=200x200',
        'https://robohash.org/efrei4?set=set4&size=200x200',
        'https://robohash.org/efrei5?set=set4&size=200x200',
        'https://robohash.org/efrei6?set=set4&size=200x200',
      ]
    },
    robots: {
      name: 'Robots',
      avatars: [
        'https://robohash.org/efreiflix1?set=set1&size=200x200',
        'https://robohash.org/efreiflix2?set=set1&size=200x200',
        'https://robohash.org/efreiflix3?set=set1&size=200x200',
        'https://robohash.org/efreiflix4?set=set1&size=200x200',
      ]
    },
    monsters: {
      name: 'Monstres',
      avatars: [
        'https://robohash.org/streaming1?set=set2&size=200x200',
        'https://robohash.org/streaming2?set=set2&size=200x200',
        'https://robohash.org/streaming3?set=set2&size=200x200',
        'https://robohash.org/streaming4?set=set2&size=200x200',
      ]
    },
    abstract: {
      name: 'Abstraits',
      avatars: [
        'https://robohash.org/cinema1?set=set3&size=200x200',
        'https://robohash.org/cinema2?set=set3&size=200x200',
        'https://ui-avatars.com/api/?name=E&background=d81b60&color=fff&size=200',
        'https://ui-avatars.com/api/?name=F&background=1e88e5&color=fff&size=200',
      ]
    },
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddProfile = async () => {
    try {
      const newProfile = {
        ...formData,
        id: Math.max(0, ...profiles.map(p => p.id)) + 1
      };
      
      const updatedProfiles = [...profiles, newProfile];
      
      await updateUserProfiles(updatedProfiles);
      
      setProfiles(updatedProfiles);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout du profil:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProfiles = profiles.map(profile => 
        profile.id === editingProfile.id ? { ...formData, id: profile.id } : profile
      );
      
      await updateUserProfiles(updatedProfiles);
      
      setProfiles(updatedProfiles);
      setEditingProfile(null);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la modification du profil:", error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce profil ?")) {
      return;
    }
    
    try {
      const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
      
      await updateUserProfiles(updatedProfiles);
      
      setProfiles(updatedProfiles);
    } catch (error) {
      console.error("Erreur lors de la suppression du profil:", error);
    }
  };

  const updateUserProfiles = async (updatedProfiles) => {
    try {
      const updatedUserData = {
        ...user,
        profiles: updatedProfiles
      };
      
      await onUpdateUserData(updatedUserData);
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour des profils:", error);
      throw error;
    }
  };

  const startEditProfile = (profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      child: profile.child,
      email: profile.email || '',
      avatar: profile.avatar,
      lang: profile.lang,
      watchlist: profile.watchlist || [],
      favorites: profile.favorites || []
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      child: false,
      email: '',
      avatar: avatarCategories.animals.avatars[0],
      lang: 'fr',
      watchlist: [],
      favorites: []
    });
    setShowAvatarModal(false);
    setActiveAvatarCategory('animals');
  };
  
  const handleSelectAvatar = (avatarUrl) => {
    setFormData({
      ...formData,
      avatar: avatarUrl
    });
  };
  
  const handleAvatarCategoryChange = (categoryKey) => {
    setActiveAvatarCategory(categoryKey);
  };
  
  const toggleAvatarModal = () => {
    setShowAvatarModal(!showAvatarModal);
  };
  
  const confirmAvatarSelection = () => {
    setShowAvatarModal(false);
  };

  const handleCancel = () => {
    setEditingProfile(null);
    setShowAddForm(false);
    setShowAvatarModal(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-netflixRed">Gestion des profils</h2>
        {!showAddForm && !editingProfile && (
          <button
            onClick={() => setShowAddForm(true)}
            className={`flex items-center px-4 py-2 ${profiles.length >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors`}
            disabled={profiles.length >= 5}
            title={profiles.length >= 5 ? "Limite de 5 profils atteinte" : "Ajouter un profil"}
          >
            <Plus className="h-4 w-4 mr-2" /> Ajouter un profil
          </button>
        )}
      </div>
      
      {profiles.length >= 5 && !editingProfile && !showAddForm && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Vous avez atteint la limite de 5 profils. Veuillez supprimer un profil existant avant d'en ajouter un nouveau.
              </p>
            </div>
          </div>
        </div>
      )}

      {(showAddForm || editingProfile) && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              {editingProfile ? `Modifier le profil: ${editingProfile.name}` : 'Ajouter un nouveau profil'}
            </h3>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="md:col-span-2 flex flex-col items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 w-full mb-2">Avatar</label>
              <div className="flex flex-col items-center">
                <div 
                  onClick={toggleAvatarModal}
                  className="cursor-pointer transform transition-all duration-200 hover:scale-105"
                >
                  <div className="relative rounded-full overflow-hidden border-4 border-gray-200 hover:border-red-400 transition-colors shadow-md">
                    <img 
                      src={formData.avatar} 
                      alt="Avatar actuel"
                      className="w-32 h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all">
                      <span className="text-white opacity-0 hover:opacity-100 font-semibold">Modifier</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Cliquez sur l'image pour changer d'avatar
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
              <select
                name="lang"
                value={formData.lang}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
                <option value="de">Allemand</option>
              </select>
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="childProfile"
                name="child"
                checked={formData.child}
                onChange={handleInputChange}
                className="h-5 w-5 text-red-500 focus:ring-red-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="childProfile" className="ml-2 block text-sm text-gray-700">
                Profil enfant
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={handleCancel}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Annuler
            </button>
            <button
              onClick={editingProfile ? handleSaveEdit : handleAddProfile}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {editingProfile ? 'Sauvegarder' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {showAvatarModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Choisir un avatar</h3>
              <button 
                onClick={toggleAvatarModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
                {Object.entries(avatarCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => handleAvatarCategoryChange(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeAvatarCategory === key
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {avatarCategories[activeAvatarCategory].avatars.map((avatar, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-xl overflow-hidden transform transition-all duration-200 ${
                      formData.avatar === avatar 
                        ? 'ring-4 ring-red-500 scale-105 shadow-lg' 
                        : 'hover:scale-105 hover:shadow-md border border-gray-200'
                    }`}
                    onClick={() => handleSelectAvatar(avatar)}
                  >
                    <div className="relative">
                      <img 
                        src={avatar} 
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      {formData.avatar === avatar && (
                        <div className="absolute bottom-2 right-2 bg-red-500 text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={confirmAvatarSelection}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-medium text-lg">{profile.name}</p>
                  <p className="text-sm text-gray-500">
                    {profile.child ? 'Profil enfant' : 'Profil adulte'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {profile.lang === 'fr' ? 'Français' : 
                     profile.lang === 'en' ? 'Anglais' : 
                     profile.lang === 'es' ? 'Espagnol' : 
                     profile.lang === 'de' ? 'Allemand' : profile.lang}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => startEditProfile(profile)}
                  className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                  title="Modifier"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-3">
              <div className="text-xs">
                <span className="font-medium">Favoris: </span>
                <span className="text-gray-600">{profile.favorites?.length || 0} films</span>
              </div>
              <div className="text-xs">
                <span className="font-medium">Watchlist: </span>
                <span className="text-gray-600">{profile.watchlist?.length || 0} films</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileManagementSection;