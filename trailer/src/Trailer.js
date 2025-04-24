import React, { useEffect, useState } from "react";

const Trailer = ({ movieName, movieId }) => {
  const [trailerId, setTrailerId] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        let id = movieId;

        if (!id && movieName) {
          const searchResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
          );
          const searchData = await searchResponse.json();
          if (!searchData.results.length) {
            console.error("Movie not found.");
            return;
          }
          id = searchData.results[0].id;
        }

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const movieDetails = await movieResponse.json();
        setMovieData(movieDetails);

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const trailerData = await trailerResponse.json();
        const trailer = trailerData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerId(trailer.key);
        } else {
          console.error("No trailer found.");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    if (movieName || movieId) {
      fetchMovieDetails();
    }
  }, [movieName, movieId]);

  return (
    <div className="w-full bg-black text-white">
      {movieData ? (
        <div>
          <div className="relative w-full h-[200px] md:h-[400px]">
            <img
              className="absolute w-full h-full object-cover opacity-50"
              src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
              alt={movieData.title}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Trailer of {movieData.title}</h1>
              <p className="text-lg md:text-xl mt-4 max-w-3xl">{movieData.overview}</p>
            </div>
          </div>

          <div className="w-full h-[500px] md:h-[700px] bg-black flex justify-center items-center">
            {trailerId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerId}`}
                title={movieData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-center p-4 text-xl">No trailer found for "{movieData.title}"</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center p-10 text-xl">Loading movie details...</p>
      )}
    </div>
  );
};

export default Trailer;
