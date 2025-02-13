import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';

const Skeleton = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Utilisez l'URL de votre serveur JSON local
    fetch('http://localhost:2066/movies')
      .then(response => response.json())
      .then(data => {
        console.log('Movies data:', data); // Ajoutez cette ligne pour vérifier les données
        setMovies(data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recommandation</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Carousel autoPlay interval={3000} infiniteLoop>
          {movies.map(movie => (
            <div key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} />
              <p className="legend">{movie.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Skeleton;