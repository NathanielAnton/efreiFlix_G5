import React from 'react';
import StarIcon from '../assets/star';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(<StarIcon key={`full-${i}`} />);
  }
  
  if (decimalPart > 0) {
    starElements.push(
      <div className="w-7" key="partial">
        <div
          style={{ width: `calc(28px*${decimalPart.toFixed(1)})` }}
          className="overflow-hidden"
        >
          <StarIcon />
        </div>
      </div>
    );
  }
  

  return <div className="flex">{starElements}</div>;
};

export default StarRating;
