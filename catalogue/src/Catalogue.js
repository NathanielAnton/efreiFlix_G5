import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moviesData from '../../db/efreiflix-db.json';
import './Catalogue.css';

// Import the ProductDetails component from the fiche-produit MFE
const ProductDetails = React.lazy(() => import('ficheProduit/ProductDetails'));

const Catalogue = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviePosters, setMoviePosters] = useState({});
  const [seriesPosters, setSeriesPosters] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const topRatedRef = useRef(null);
  const movieRowRef = useRef(null);
  const seriesRowRef = useRef(null);
  const genreRowRefs = useRef({});

  // Listen for search events
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchFilter(event.detail.searchTerm.toLowerCase());
    };

    window.addEventListener('user-search', handleSearch);
    return () => window.removeEventListener('user-search', handleSearch);
  }, []);

  // Filter content based on search
  const filterContent = (items) => {
    if (!searchFilter) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchFilter) ||
        item.description.toLowerCase().includes(searchFilter)
    );
  };

  // Get unique genres from both movies and series
  const allGenres = [
    ...new Set([
      ...moviesData.movies.flatMap((movie) => movie.genres),
      ...moviesData.series.flatMap((series) => series.genres),
    ]),
  ].sort();

  // Get top 10 rated content (movies + series combined)
  const topRatedContent = filterContent([
    ...moviesData.movies.map((movie) => ({ ...movie, isSeries: false })),
    ...moviesData.series.map((series) => ({ ...series, isSeries: true })),
  ])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  useEffect(() => {
    const fetchPosters = async () => {
      const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

      // Fetch movie posters
      const moviePromises = moviesData.movies.map(async (movie) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie.title}`
        );
        const posterPath = response.data.results[0]?.poster_path;
        return {
          id: movie.id,
          posterUrl: `http://image.tmdb.org/t/p/w500/${posterPath}`,
        };
      });

      // Fetch series posters
      const seriesPromises = moviesData.series.map(async (series) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${series.title}`
        );
        const posterPath = response.data.results[0]?.poster_path;
        return {
          id: series.id,
          posterUrl: `http://image.tmdb.org/t/p/w500/${posterPath}`,
        };
      });

      const moviePosters = await Promise.all(moviePromises);
      const seriesPosters = await Promise.all(seriesPromises);

      const moviePostersMap = moviePosters.reduce((acc, { id, posterUrl }) => {
        acc[id] = posterUrl;
        return acc;
      }, {});

      const seriesPostersMap = seriesPosters.reduce(
        (acc, { id, posterUrl }) => {
          acc[id] = posterUrl;
          return acc;
        },
        {}
      );

      setMoviePosters(moviePostersMap);
      setSeriesPosters(seriesPostersMap);
    };

    fetchPosters();
  }, []);

  const handleItemClick = (item, isSeries = false) => {
    const itemWithPoster = {
      ...item,
      posterUrl: isSeries ? seriesPosters[item.id] : moviePosters[item.id],
      isSeries,
    };
    setSelectedMovie(itemWithPoster);
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );

  const ChevronRight = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );

  const ContentRow = ({
    title,
    items,
    rowRef,
    posters,
    isSeries = false,
    showRank = false,
  }) => (
    <>
      <h1 className="catalogue-title">{title}</h1>
      <div className="movies-section">
        <button
          className="scroll-button left"
          onClick={() => scroll(rowRef, 'left')}
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
        <div className="movies-row" ref={rowRef}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className="movie-card"
              onClick={() => handleItemClick(item, item.isSeries || isSeries)}
            >
              {showRank && <div className="rank-badge">#{index + 1}</div>}
              <img
                src={
                  (item.isSeries || isSeries
                    ? seriesPosters[item.id]
                    : moviePosters[item.id]) || item.posterUrl
                }
                alt={item.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h2 className="movie-title">{item.title}</h2>
                <p className="movie-year">{item.year}</p>
                <p className="movie-rating">Note: {item.rating}/5</p>
                <p className="movie-description">{item.description}</p>
                <a
                  href={item.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          className="scroll-button right"
          onClick={() => scroll(rowRef, 'right')}
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );

  return (
    <div className="catalogue-container">
      {selectedMovie ? (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ProductDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
        </React.Suspense>
      ) : (
        <>
          {/* Top 10 Row */}
          <ContentRow
            title="Top 10 Films et Séries"
            items={topRatedContent}
            rowRef={topRatedRef}
            posters={{ ...moviePosters, ...seriesPosters }}
            showRank={true}
          />

          {/* Movies Row */}
          <ContentRow
            title="Films populaires"
            items={filterContent(moviesData.movies)}
            rowRef={movieRowRef}
            posters={moviePosters}
          />

          {/* Series Row */}
          <ContentRow
            title="Séries populaires"
            items={filterContent(moviesData.series)}
            rowRef={seriesRowRef}
            posters={seriesPosters}
            isSeries={true}
          />

          {/* Genre-based Rows */}
          {allGenres.map((genre) => {
            const genreContent = filterContent([
              ...moviesData.movies.filter((movie) =>
                movie.genres.includes(genre)
              ),
              ...moviesData.series.filter((series) =>
                series.genres.includes(genre)
              ),
            ]);

            if (genreContent.length === 0) return null;

            if (!genreRowRefs.current[genre]) {
              genreRowRefs.current[genre] = React.createRef();
            }

            return (
              <ContentRow
                key={genre}
                title={`${genre}`}
                items={genreContent}
                rowRef={genreRowRefs.current[genre]}
                posters={{ ...moviePosters, ...seriesPosters }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Catalogue;
