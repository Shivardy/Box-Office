import React from "react";
import "../css/starRating.css";
const StarRating = ({ vote }) => {
  const styles = {
    width: `${vote}%`
  };

  return (
    <div className="star-rating">
      <div className="back-stars">
        <i className="fa fa-star-o" aria-hidden="true" />
        <i className="fa fa-star-o" aria-hidden="true" />
        <i className="fa fa-star-o" aria-hidden="true" />
        <i className="fa fa-star-o" aria-hidden="true" />
        <i className="fa fa-star-o" aria-hidden="true" />

        <div className="front-stars" style={styles}>
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default StarRating;
