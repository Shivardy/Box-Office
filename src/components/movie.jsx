import React, { Component } from "react";
import getData from "../services/http";
import "../css/movie.css";
import StarRating from "../services/starRating";
import { Link } from "react-router-dom";
import SimpleSlider from "./slider";
import MovieItemContainer from "./movieItemContainer";
import animateScrollTo from "animated-scroll-to";
import queryString from "query-string";
import Pagination from "./pagination";
import getButton from "../services/getButton";
import SplashScreen from "./splashScreen";
import VideoModal from "./videoModal";
import SearchBar from "./searchBar";
import titleCase from "../services/titleCase";
import NotFound from "./notFound";
class Movie extends Component {
  state = {
    data: {},
    renderSplashScreen: true
  };
  componentDidMount() {
    this.settingState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.settingState();
    }
  }

  async settingState() {
    const baseurl = process.env.REACT_APP_BASEURL;
    const apikey = process.env.REACT_APP_APIKEY;
    this.setState({
      renderSplashScreen: true
    });
    let { page } = queryString.parse(this.props.location.search);
    if (!page) page = 1;
    let movieId = this.props.match.params.id;
    const path = `${baseurl}movie/${movieId}?api_key=${apikey}&append_to_response=recommendations,videos,credits&page=${page}`;
    try {
      const { data } = await getData(path);
      this.setState({
        data: data,
        renderSplashScreen: false,
        notFound: false
      });
    } catch (ex) {
      this.setState({
        notFound: true,
        renderSplashScreen: false
      });
    }
  }

  getImageSource(path) {
    const imgURL = process.env.REACT_APP_LARGEIMG;
    if (path) return `${imgURL + path}`;
    else return "/static/No_image_Source_Large.jpg";
  }
  getOriginalTitle({ title, original_title }) {
    return title !== original_title ? original_title : "";
  }
  getRunTime(runtime) {
    return runtime ? `${runtime} MIN` : "";
  }
  render() {
    const movie = this.state.data;
    const { recommendations } = this.state.data;
    animateScrollTo(0);
    const path = this.props.location.pathname;
    if (movie.title) document.title = `${titleCase(movie.title)} - Movie`;
    if (this.state.renderSplashScreen) return <SplashScreen />;
    else if (this.state.notFound) return <NotFound />;
    else
      return (
        <div className="movieContainer">
          <SearchBar history={this.props.history} />
          <div className="movieBox row">
            <div className="col-lg-4">
              <div className="movieImage">
                <img
                  src={this.getImageSource(movie.poster_path)}
                  alt={movie.title}
                />
              </div>
            </div>
            <div className="movieInfo col-lg-8">
              <div className="movieTitle">
                <h2>{movie.title}</h2>
                <p>
                  <b>{movie.tagline}</b>
                </p>
              </div>

              <div className="movieInfo2">
                <div className="movieRating">
                  <StarRating vote={movie.vote_average * 10} />
                  <i>
                    {`${movie.vote_average} average out of ${
                      movie.vote_count
                    } votes`}
                  </i>
                </div>
                {movie.spoken_languages[0] && (
                  <div>
                    <p>{`${
                      movie.spoken_languages[0].name
                    } / ${this.getOriginalTitle(movie)} ${this.getRunTime(
                      movie.runtime
                    )}`}</p>
                    <p>{`Release Date: ${movie.release_date}`}</p>
                  </div>
                )}
              </div>

              <div className="movieGenreBox">
                <h4>Genres</h4>
                <div className="movieGenre">
                  {movie.genres &&
                    movie.genres.map(genre => (
                      <Link
                        to={`/genres/${genre.name}`}
                        key={genre.name}
                        className="button"
                      >
                        {genre.name}
                      </Link>
                    ))}
                </div>
              </div>

              <div className="movieOverview">
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>

              <div className="movieCast">
                <h4>Cast</h4>
                <SimpleSlider cast={movie.credits.cast} />
              </div>

              <div className="movieButton">
                {getButton(movie.homepage, "Website", "fa fa-link")}
                {getButton(movie.imdb_id, "IMDB", "fa fa-imdb")}
                {movie.videos.results.length && (
                  <VideoModal video={movie.videos.results[0].key} />
                )}
              </div>
            </div>
          </div>
          {recommendations.total_results && (
            <div>
              <p className="lead breadcrumbMainHeading">Recommended</p>
              <p className="breadcrumbSubHeading">Movies</p>
              {recommendations && (
                <MovieItemContainer movies={recommendations.results} />
              )}
              {recommendations.total_results > 20 && (
                <Pagination
                  currentPage={this.state.data.recommendations.page}
                  totalPages={this.state.data.recommendations.total_pages}
                  path={path}
                />
              )}
            </div>
          )}
        </div>
      );
  }
}

export default Movie;
