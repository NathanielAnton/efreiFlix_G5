import React, { Suspense, useEffect, useState } from 'react';
import './styles.css';
import { fetchData } from '../service/catalog';
import MovieCard from './components/MovieCard';
import './styles/index.css';
import axios from 'axios';

const ProductDetails = React.lazy(() => import('ficheProduit/ProductDetails'));

const Catalog = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [data, setData] = useState(null);
  const [moviePosters, setMoviePosters] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (e) {
        console.error('Failed to fetch data:', e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchPosters = async () => {
      const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

      // Fetch movie posters
      const moviePromises = data?.map(async (movie) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie.title}`
        );

        const posterPath = response.data.results[0]?.poster_path;

        return {
          id: movie.id,
          posterUrl: `http://image.tmdb.org/t/p/w500/${posterPath}`,
        };
      });

      const moviePosters = await Promise.all(moviePromises);

      const moviePostersMap = moviePosters.reduce((acc, { id, posterUrl }) => {
        acc[id] = posterUrl;
        return acc;
      }, {});

      setMoviePosters(moviePostersMap);
    };

    fetchPosters();
  }, [data]);

  const handleItemClick = (item) => {
    const itemWithPoster = {
      ...item,
      posterUrl: moviePosters[item.id],
    };
    setSelectedMovie(itemWithPoster);
  };

  if (!data) return <div>Loading...</div>;

  const moviesByGenre = data.reduce((acc, movie) => {
    movie.genres.forEach((genre) => {
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
    });
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 m-[20px_4%]">
      {selectedMovie ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
        </Suspense>
      ) : (
        Object.entries(moviesByGenre).map(([genre, movies], index) => (
          <div
            key={genre}
            style={{
              zIndex: Object.entries(moviesByGenre).length - index,
            }}
          >
            <h2 className="text-xl font-bold mb-4">{genre}</h2>
            <div className="hide-scrollbar pl-2 -ml-2 pt-2 -mt-2 pb-28 -mb-28 overflow-x-auto whitespace-nowrap">
              <div className="flex gap-4">
                {movies.map((movie) => (
                  <MovieCard
                    onClick={() => handleItemClick(movie)}
                    key={movie.id}
                    movie={movie}
                    img={moviePosters[movie.id]}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Catalog;
