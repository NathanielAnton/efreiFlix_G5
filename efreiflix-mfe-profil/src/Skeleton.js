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
      <h1 className="profile-title">Profil</h1>
      <div className="profile-card">

        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="menu-title">Menu</h2>
          <ul className="menu-list">
            <li
              className={`menu-item ${selectedSection === "public" ? "active" : ""}`}
              onClick={() => setSelectedSection("public")}
            >
              Profil public
            </li>
            <li
              className={`menu-item ${selectedSection === "account" ? "active" : ""}`}
              onClick={() => setSelectedSection("account")}
            >
              Compte
            </li>
            <li className="menu-item">Facturation et abonnement</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="profile-content">
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
      <h2 className="section-title">Profil public</h2>
      <div className="profile-header">
        <img
          src={aliceProfile.avatar}
          alt="Avatar"
          className="avatar"
        />
        <button className="btn-edit">
          Modifier
        </button>
      </div>
      <div className="input-group">
        <label>Nom</label>
        <input type="text" value={aliceProfile.name} readOnly />
      </div>
      <div className="input-group">
        <label>Email public</label>
        <input type="email" value={aliceProfile.email} readOnly />
      </div>
      <div className="input-group">
        <label>Bio</label>
        <textarea readOnly>{aliceProfile.bio}</textarea>
      </div>
      <div className="update-button">
        <button className="btn-update">
          Mettre à jour le profil
        </button>
      </div>
    </>
  );
};

// Gestion des Profils
const ProfileManager = ({ selectedProfile, setSelectedProfile }) => {

  const handleAddProfile = () => {
    // Logique pour ajouter un nouveau profil
    console.log("Ajouter un nouveau profil");
  };

  return (
    <div className="flex flex-col items-center">
      {selectedProfile ? (
        <ProfileEdit profile={selectedProfile} onCancel={() => setSelectedProfile(null)} />
      ) : (
        <>
          <h2 className="section-title">Gestion des profils</h2>
          <div className="flex gap-6 items-center">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="profile-thumbnail"
                onClick={() => setSelectedProfile(profile)}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="avatar-small"
                />
                <p className="profile-name">{profile.name}</p>
              </div>
            ))}
            {/* Bouton "+" ajouté à la suite des profils */}
            <button
              onClick={handleAddProfile}
              className="btn-add-profile"
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
    <div className="profile-edit-container">
      <h1 className="text-2xl font-bold mb-4">Modifier le profil</h1>
      <img src={userProfile.avatar} alt="Avatar" className="avatar-small mb-3" />
      <input
        type="text"
        name="name"
        value={userProfile.name}
        onChange={handleChange}
        className="input-field"
      />
      <select
        name="language"
        value={userProfile.language || "FRANÇAIS"}
        onChange={handleChange}
        className="input-field"
      >
        <option>FRANÇAIS</option>
        <option>ENGLISH</option>
      </select>
      <select
        name="ageLimit"
        value={userProfile.ageLimit || "TOUS LES ÂGES"}
        onChange={handleChange}
        className="input-field"
      >
        <option>TOUS LES ÂGES</option>
        <option>ADULTES</option>
        <option>ENFANTS</option>
      </select>
      <div className="flex gap-4">
        <button onClick={handleSave} className="btn-save">
          ENREGISTRER
        </button>
        <button onClick={onCancel} className="btn-cancel">
          ANNULER
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
