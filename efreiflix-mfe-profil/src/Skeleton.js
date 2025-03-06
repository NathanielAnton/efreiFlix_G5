import React, { useState, useEffect } from "react";

const aliceProfile = {
  name: "Alice",
  bio: "Étudiante passionnée de ciné",
  email: "Alice@1.net",
  avatar: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/31152e75-8fca-497f-bef6-aa065dd7cb67/original=true,quality=90/8A28H215PTYKEQ64TD8EEK2MV0.jpeg",
};

const profiles = [
  { id: 1, name: "Alice", avatar: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/31152e75-8fca-497f-bef6-aa065dd7cb67/original=true,quality=90/8A28H215PTYKEQ64TD8EEK2MV0.jpeg" },
  { id: 2, name: "Pierre", avatar: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3cd5e7b7-47fe-470a-b1df-356c700f0c4e/anim=false,width=450/54947162.jpeg" }
];

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("public");
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Profil</h1>
      <div className="flex bg-gray-900 shadow-md rounded-lg p-6">

        {/* Sidebar */}
        <div className="w-1/4 pr-6 border-r border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${selectedSection === "public" ? "text-red-500 font-medium" : "text-gray-400"}`}
              onClick={() => setSelectedSection("public")}
            >
              Profil public
            </li>
            <li
              className={`cursor-pointer ${selectedSection === "account" ? "text-red-500 font-medium" : "text-gray-400"}`}
              onClick={() => setSelectedSection("account")}
            >
              Compte
            </li>
            <li className="text-gray-400">Facturation et abonnement</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 pl-6">
          {selectedSection === "public" && (
            <ProfilePublic />
          )}
          {selectedSection === "account" && (
            <ProfileManager
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Profil Public
const ProfilePublic = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Profil public</h2>
      <div className="flex items-center mb-4">
        <img
          src={aliceProfile.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mr-4 border-2 border-red-600"
        />
        <button className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
          Modifier
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium">Nom</label>
        <input type="text" className="w-full border rounded-lg p-2 bg-gray-800 text-white" value={aliceProfile.name} readOnly />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium">Email public</label>
        <input type="email" className="w-full border rounded-lg p-2 bg-gray-800 text-white" value={aliceProfile.email} readOnly />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-medium">Bio</label>
        <textarea className="w-full border rounded-lg p-2 bg-gray-800 text-white" readOnly>{aliceProfile.bio}</textarea>
      </div>
      <div className="mt-6">
        <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700">
          Mettre à jour le profil
        </button>
      </div>
    </>
  );
};

// Gestion des Profils
const ProfileManager = ({ selectedProfile, setSelectedProfile }) => {

  const handleAddProfile = () => {
    console.log("Ajouter un nouveau profil");
  };

  return (
    <div className="flex flex-col items-center">
      {selectedProfile ? (
        <ProfileEdit profile={selectedProfile} onCancel={() => setSelectedProfile(null)} />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Gestion des profils</h2>
          <div className="flex gap-6 items-center">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => setSelectedProfile(profile)}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-lg border-2 border-gray-500"
                />
                <p className="mt-2 text-lg font-semibold">{profile.name}</p>
              </div>
            ))}
            <button
              onClick={handleAddProfile}
              className="text-white text-lg font-bold border-2 border-gray-500 rounded-lg px-3 py-1 hover:bg-gray-700 flex items-center justify-center"
              style={{ height: "40px", width: "40px", marginBottom: "20px" }}
            >
              +
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Édition du Profil
const ProfileEdit = ({ profile, onCancel }) => {
  const [userProfile, setUserProfile] = useState(profile);

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Profil enregistré :", userProfile);
    onCancel();
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 w-96 rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Modifier le profil</h1>
      <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-3 border-2 border-gray-500" />
      <input
        type="text"
        name="name"
        value={userProfile.name}
        onChange={handleChange}
        className="text-black p-2 rounded w-full mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <select
        name="language"
        value={userProfile.language || "FRANÇAIS"}
        onChange={handleChange}
        className="text-black p-2 rounded w-full mb-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option>FRANÇAIS</option>
        <option>ENGLISH</option>
      </select>
      <select
        name="ageLimit"
        value={userProfile.ageLimit || "TOUS LES ÂGES"}
        onChange={handleChange}
        className="text-black p-2 rounded w-full mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option>TOUS LES ÂGES</option>
        <option>ADULTES</option>
        <option>ENFANTS</option>
      </select>
      <div className="flex gap-4">
        <button onClick={handleSave} className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-300 transition">
          ENREGISTRER
        </button>
        <button onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
          ANNULER
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
