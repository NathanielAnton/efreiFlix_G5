import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';

const Skeleton = ({ userId = null, profileId = null }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        let recommendedIds = [];

        if (userId && profileId) {
          const userResponse = await fetch(`http://localhost:2066/users/${userId}`);
          const user = await userResponse.json();
        
          const profile = user.profiles.find(p => p.id === profileId);
          if (!profile) throw new Error("Profil non trouvé.");

          const userMovies = [...new Set([...profile.favorites, ...profile.watchlist])];

          const recResponse = await fetch('http://localhost:2066/recommendations');
          const recommendations = await recResponse.json();
          console.log("📌 Recommandations récupérées:", recommendations);

          recommendedIds = recommendations
            .filter(rec => userMovies.includes(Number(rec.movieId)))
            .flatMap(rec => rec.recommendedMovieIds.map(Number));

          recommendedIds = [...new Set(recommendedIds)].filter(id => !userMovies.includes(id));
        }

        const moviesResponse = await fetch('http://localhost:2066/movies');
        const movies = await moviesResponse.json();

        let filteredMovies;
        if (recommendedIds.length > 0) {
          filteredMovies = movies.filter(movie => recommendedIds.includes(Number(movie.id)));
        } else {
          filteredMovies = movies.sort((a, b) => b.rating - a.rating);
        }

        setRecommendedMovies(filteredMovies);
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId, profileId]);

  return (
    <div className="bg-black text-white">
      <div className="relative w-full h-screen">
      <video 
      src="https://assets.codepen.io/6093409/hubspot-video-example.mp4"
      className="absolute top-0 left-0 w-full h-full object-cover"
          muted
          loop
          autoPlay
          autoFocus>
        </video>
        
      </div>
    <div className="container mx-auto p-6 bg-black text-white">
    <h1 className="text-3xl font-bold mb-4">Recommandations</h1>
    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--color-midnight)', color: 'var(--foreground)' }}>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur : {error}</p>}
      {!loading && !error && recommendedMovies.length > 0 && (
        <>
          
          <Carousel
          showArrows={false}
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            className="carousel"
            centerMode
            centerSlidePercentage={15.15}
          >
            {recommendedMovies.map(movie => (
              <div key={movie.id} className="carousel-item px-2">
                <div className="relative w-full h-64">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}
      {!loading && !error && recommendedMovies.length === 0 && (
        <p>Aucune recommandation disponible.</p>
      )}
    </div>
  </div>
  </div>
);
};

export default Skeleton;