import React from 'react';
import StarRating from './StarRating';
import Tag from './Tag';

const MovieCard = ({ onClick, movie, img }) => {
  return (
    <div
      onClick={onClick}
      className="w-full min-w-[270px] max-w-[270px] group hover:scale-[1.06] duration-200 rounded-md group flex flex-col gap-1 justify-center cursor-pointer"
    >
      <div className="relative flex items-center justify-center w-full aspect-video">
        <div className="rounded-t-md hidden group-hover:flex flex-col absolute top-0 items-center justify-center left-0 bg-gray-900 text-white h-full w-full bg-opacity-50">
          <div>
            <StarRating rating={movie.rating} />
          </div>
          <div className="rounded-b-md absolute bg-gray-900 bottom-0 translate-y-full w-full left-0 px-4 pt-4 pb-6 flex flex-col gap-2">
            <div className="flex align-center w-full justify-between">
              <h2>{movie.title}</h2>
              <span className="text-gray-500">{movie.year}</span>
            </div>
            <ul className="flex gap-1">
              {movie.genres.map((genre) => {
                return <Tag key={genre}>{genre}</Tag>;
              })}
            </ul>
          </div>
        </div>
        <div
          className="aspect-video flex items-center justify-center h-full w-full bg-cover bg-center bg-no-repeat rounded-md group-hover:rounded-t-md group-hover:rounded-b-none"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </div>
  );
};

export default MovieCard;
