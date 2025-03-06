import React from 'react';
import './styles.css';

const aliceProfile = {
  name: "Alice",
  bio: "Étudiante passionnée de ciné",
  email: "Alice@1.net",
  avatar: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/31152e75-8fca-497f-bef6-aa065dd7cb67/original=true,quality=90/8A28H215PTYKEQ64TD8EEK2MV0.jpeg",
};

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Profil</h1>
      <div className="profile-card">
        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="menu-title">Menu</h2>
          <ul className="menu-list">
            <li className="menu-item active">Profil public</li>
            <li className="menu-item">Compte</li>
            <li className="menu-item">Facturation et abonnement</li>
          </ul>
        </div>

        {/* Main Profile Section */}
        <div className="profile-content">
          <h2 className="section-title">Profil public</h2>
          <div className="profile-header">
            <img src={aliceProfile.avatar} alt="Avatar" className="avatar" />
            <button className="btn-edit">Modifier</button>
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

          {/* Bouton Mettre à jour */}
          <div className="update-button">
            <button className="btn-update">Mettre à jour le profil</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
