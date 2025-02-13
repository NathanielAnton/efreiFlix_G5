import React, { useEffect, useState } from 'react';
import './styles.css';

const Skeleton = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:2066/users/1")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  const mainProfile = user?.profiles?.[0] || {};

  return (
    <div className="user-profile">
      <img
        src={mainProfile.avatar || "https://via.placeholder.com/150"}
        alt="User Avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p className="bio">{user.bio}</p>
    </div>
  );
};

export default Skeleton;
