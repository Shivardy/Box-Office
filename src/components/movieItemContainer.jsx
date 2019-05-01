import React from "react";
import MovieItem from "./movieItem";
const MovieItemContainer = ({ movies }) => {
  return (
    <div className="containerBox">
      {movies.map(movie => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieItemContainer;
