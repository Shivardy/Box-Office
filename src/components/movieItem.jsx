import React, { Component } from "react";
import StarRating from "../services/starRating";
import "../css/movieItem.css";
import { Link } from "react-router-dom";
class MovieItem extends Component {
  state = {
    isHovered: false
  };
  hoverHandler() {
    this.setState({ isHovered: !this.state.isHovered });
  }
  releaseOrVote(movie) {
    if (this.state.isHovered)
      return (
        <div className="voteDesc">{`${movie.vote_average} average out of ${
          movie.vote_count
        } votes`}</div>
      );
    else
      return (
        <p className="releaseDate">
          <b>Release Date: </b> {movie.release_date}
        </p>
      );
  }
  getImageSource(movie) {
    const imgURL = process.env.REACT_APP_SMALLIMG;
    if (movie.poster_path) return `${imgURL + movie.poster_path}`;
    else return "/static/No_image_Source_Small.jpg";
  }
  render() {
    const { movie } = this.props;

    return (
      <Link
        className="movieItem"
        to={`/movie/${movie.id}`}
        onMouseEnter={() => this.hoverHandler()}
        onMouseLeave={() => this.hoverHandler()}
      >
        <img src={this.getImageSource(movie)} alt={movie.title} />

        <b>
          <p className="itemTitle">{movie.title}</p>
        </b>
        {!this.state.isHovered && (
          <b className="releaseDate">{movie.release_date}</b>
        )}
        {this.state.isHovered && (
          <b className="voteDesc">
            {`${movie.vote_average} average out of ${movie.vote_count} votes`}
          </b>
        )}
        {/* {this.releaseOrVote(movie)} */}
        <StarRating vote={movie.vote_average * 10} />
      </Link>
    );
  }
}

export default MovieItem;
