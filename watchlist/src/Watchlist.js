import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import './Watchlist.css';

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const userResponse = await fetch('http://localhost:2066/users/1');
      if (!userResponse.ok) throw new Error('Erreur lors du chargement de l\'utilisateur');
      const user = await userResponse.json();
      const profile = user.profiles && user.profiles[0];
      if (!profile) throw new Error('Aucun profil trouvé');
      const watchlistItems = profile.watchlist || [];

      const [moviesResponse, seriesResponse] = await Promise.all([
        fetch('http://localhost:2066/movies'),
        fetch('http://localhost:2066/series')
      ]);
      if (!moviesResponse.ok || !seriesResponse.ok) throw new Error('Erreur lors du chargement des films/séries');
      const movies = await moviesResponse.json();
      const series = await seriesResponse.json();

      const watchlistWithDetails = await Promise.all(
        watchlistItems.map(async item => {
          if (!item || !item.type || !item.id) return null;
          let data;
          if (item.type === "movie") {
            data = movies.find(m => String(m.id) === String(item.id));
          } else if (item.type === "series") {
            data = series.find(s => String(s.id) === String(item.id));
          }
          if (!data) return null;
          let posterPath = null;
          if (item.type === "movie") {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.title}`);
            posterPath = response.data.results[0]?.poster_path;
          } else {
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${data.title}`);
            posterPath = response.data.results[0]?.poster_path;
          }
          return {
            id: data.id,
            type: item.type,
            title: data.title,
            poster: posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "https://via.placeholder.com/250x375",
            releaseDate: new Date(data.year, 0).toISOString(),
            rating: data.rating,
            overview: data.description,
            seasons: data.seasons,
            isSeries: item.type === "series"
          };
        })
      );
      setWatchlist(watchlistWithDetails.filter(Boolean));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId, type) => {
    try {
      setLoading(true);
      const userResponse = await fetch('http://localhost:2066/users/1');
      if (!userResponse.ok) throw new Error('Erreur lors du chargement de l\'utilisateur');
      const user = await userResponse.json();
      const profile = user.profiles && user.profiles[0];
      if (!profile) throw new Error('Aucun profil trouvé');
      const newWatchlist = (profile.watchlist || []).filter(item => !(item && item.type === type && String(item.id) === String(movieId)));
      profile.watchlist = newWatchlist;
      await fetch(`http://localhost:2066/users/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profiles: user.profiles })
      });
      setWatchlist(prev => prev.filter(item => !(item.id === movieId && item.type === type)));
    } catch (err) {
      setError(err.message);
      alert('Erreur lors de la suppression du film: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">Ma Watchlist</h1>
      {error && <div className="watchlist-error">{error}</div>}
      {watchlist.length === 0 ? (
        <div className="watchlist-empty">Aucun film ou série dans votre watchlist.</div>
      ) : (
        <div className="watchlist-row">
          {watchlist.map(movie => (
            <div
              key={movie.type + '-' + movie.id}
              className="movie-card"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-year">{new Date(movie.releaseDate).getFullYear()}</p>
                <p className="movie-rating">Note : {movie.rating}/5</p>
                {movie.isSeries && <p className="movie-seasons">{movie.seasons} saison{movie.seasons > 1 ? 's' : ''}</p>}
                <p className="movie-description">{movie.overview}</p>
                <button
                  onClick={() => removeFromWatchlist(movie.id, movie.type)}
                  className="watchlist-remove-btn"
                  disabled={loading}
                >
                  {loading ? 'Suppression...' : 'Retirer de la watchlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;