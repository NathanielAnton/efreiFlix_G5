import React, { useState, useEffect } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ movie, onBack }) => {
  console.log('Movie data:', movie);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(movie.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    const checkDuplicate = async () => {
      try {
        const userResponse = await fetch('http://localhost:2066/users/1');
        if (!userResponse.ok) return;
        const user = await userResponse.json();
        const profile = user.profiles && user.profiles[0];
        if (!profile) return;
        const watchlist = profile.watchlist || [];
        const type = movie.isSeries ? "series" : "movie";
        if (watchlist.some(item => item && item.type === type && String(item.id) === String(movie.id))) setAdded(true);
      } catch (e) {
      }
    };
    checkDuplicate();
  }, [movie.id, movie.isSeries]);

  const handleAddToWatchlist = async () => {
    setAdding(true);
    setError(null);
    try {
      const userResponse = await fetch('http://localhost:2066/users/1');
      if (!userResponse.ok) throw new Error('Erreur lors du chargement de l\'utilisateur');
      const user = await userResponse.json();
      const profile = user.profiles && user.profiles[0];
      if (!profile) throw new Error('Aucun profil trouvé');
      const watchlist = profile.watchlist || [];
      const type = movie.isSeries ? "series" : "movie";
      if (watchlist.some(item => item && item.type === type && String(item.id) === String(movie.id))) {
        setAdded(true);
        setAdding(false);
        return;
      }
      profile.watchlist = [...watchlist, { type, id: Number(movie.id) }];
      await fetch('http://localhost:2066/users/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profiles: user.profiles })
      });
      setAdded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  // Fonction pour mettre à jour la note côté serveur
  const handleStarClick = async (rating) => {
    setRatingLoading(true);
    try {
      // PATCH la note du film/série (adapter l'URL selon votre backend)
      const type = movie.isSeries ? "series" : "movies";
      await fetch(`http://localhost:2066/${type}/${movie.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating })
      });
      setUserRating(rating);
    } catch (e) {
      // Optionnel: afficher une erreur
    } finally {
      setRatingLoading(false);
    }
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <img src={movie.posterUrl || "https://via.placeholder.com/250x375"} alt={movie.title} />
        <div className="product-details-content">
          <h1>{movie.isSeries ? 'Série' : 'Film'}</h1>
          <h2>{movie.title}</h2>
          
          <div className="product-details-meta">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genre}</span>
            {movie.isSeries && (
              <>
                <span>•</span>
                <span>{movie.seasons} saison{movie.seasons > 1 ? 's' : ''}</span>
              </>
            )}
          </div>

          <div className="product-details-rating" style={{ marginBottom: '0.5rem' }}>
            {/* Affichage des étoiles interactives */}
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: ratingLoading ? 'not-allowed' : 'pointer',
                  color: (hoverRating || userRating) >= star ? '#FFD700' : '#ccc',
                  fontSize: '2rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={() => !ratingLoading && setHoverRating(star)}
                onMouseLeave={() => !ratingLoading && setHoverRating(0)}
                onClick={() => !ratingLoading && handleStarClick(star)}
                role="button"
                aria-label={`Donner ${star} étoile${star > 1 ? 's' : ''}`}
                tabIndex={0}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: '0.5rem', fontSize: '1rem', color: '#888' }}>
              {userRating}/5
            </span>
          </div>

          <p className="product-details-description">{movie.description}</p>

          <button
            className="product-details-button"
            style={{ marginBottom: '1rem', background: added ? '#444' : '#e50914' }}
            onClick={handleAddToWatchlist}
            disabled={adding || added}
          >
            {added ? 'Déjà dans la watchlist' : adding ? 'Ajout...' : 'Ajouter à la watchlist'}
          </button>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

          {movie.trailerUrl && (
            <div className="product-details-trailer">
              <h3>Bande Annonce</h3>
              <iframe
                width="100%"
                height="250"
                src={movie.trailerUrl}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <button className="product-details-button" onClick={onBack}>
            Retour au Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;