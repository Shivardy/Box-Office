import React, { Component } from "react";
import getData from "../services/http";
import titleCase from "../services/titleCase";
import "../css/discover.css";
import queryString from "query-string";
import animateScrollTo from "animated-scroll-to";
import MovieItemContainer from "./movieItemContainer";
import Pagination from "./pagination";
import SplashScreen from "./splashScreen";
import SearchBar from "./searchBar";
import NotFound from "./notFound";
class Discover extends Component {
  state = {
    movies: [],
    currentPage: 1,
    renderSplashScreen: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.settingMovies(
        this.props.location.pathname,
        this.props.match.params.id,
        this.props.location.search
      );
    }
  }

  componentDidMount() {
    this.settingMovies(
      this.props.location.pathname,
      this.props.match.params.id,
      this.props.location.search
    );
  }
  async settingMovies(pathname, parameter, pageString) {
    parameter = parameter.replace(" ", "%20");
    const baseurl = process.env.REACT_APP_BASEURL;
    const apikey = process.env.REACT_APP_APIKEY;
    let { page } = queryString.parse(pageString);
    if (!page) page = 1;
    const { genres } = this.props;
    pathname = pathname.slice(1);
    pathname = pathname.substr(0, pathname.indexOf("/"));
    let path = "";
    if (pathname === "discover")
      path = `${baseurl}movie/${parameter}?api_key=${apikey}&page=${page}`;
    else if (pathname === "trending")
      path = `${baseurl}trending/${parameter}/week?api_key=${apikey}&page=${page}`;
    else if (pathname === "genres") {
      let genreId = "";
      for (let genre of genres) {
        if (genre.name === parameter) {
          genreId = genre.id;
          break;
        }
      }
      path = `${baseurl}discover/movie?api_key=${apikey}&with_genres=${genreId}&page=${page}`;
    } else if (pathname === "search")
      path = `${baseurl}search/movie?api_key=${apikey}&query=${parameter}&page=${page}`;
    try {
      const { data } = await getData(path);
      const totalPages = data.total_pages > 1000 ? 1000 : data.total_pages;
      this.setState({
        movies: data.results,
        currentPage: parseInt(page),
        totalPages: totalPages,
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

  render() {
    const { movies } = this.state;
    const parameter = this.props.match.params.id;
    let url = this.props.location.pathname.slice(1);
    url = url.substr(0, url.indexOf("/"));
    const path = this.props.location.pathname;
    document.title = `${titleCase(url)} - ${titleCase(parameter)}`;
    animateScrollTo(0);
    if (this.state.renderSplashScreen) return <SplashScreen />;
    else if (this.state.notFound) return <NotFound />;
    else
      return (
        <div>
          <div className="row">
            <div className="col-sm-2">
              <p className="lead breadcrumbMainHeading">
                {titleCase(parameter)}
              </p>
              <p className="breadcrumbSubHeading">{titleCase(url)}</p>
            </div>
            <div className="col-sm-10">
              <SearchBar history={this.props.history} />
            </div>
          </div>

          <MovieItemContainer movies={movies} />
          {!movies.length && (
            <div className="noResults">
              <h3>No Results for Search Term</h3>
              <h2>{titleCase(parameter)}</h2>
              <p>Try different movie name</p>
            </div>
          )}
          {this.state.totalPages > 2 && (
            <Pagination
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              path={path}
            />
          )}
        </div>
      );
  }
}

export default Discover;
