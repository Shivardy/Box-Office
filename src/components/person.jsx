import React, { Component } from "react";
import getData from "../services/http";
import queryString from "query-string";
import getButton from "../services/getButton";
import "../css/person.css";
import MovieItemContainer from "./movieItemContainer";
import SplashScreen from "./splashScreen";
import SearchBar from "./searchBar";
import titleCase from "../services/titleCase";
import NotFound from "./notFound";
class Person extends Component {
  state = {
    renderSplashScreen: true
  };
  componentDidMount() {
    this.settingState();
  }
  async settingState() {
    const baseurl = process.env.REACT_APP_BASEURL;
    const apikey = process.env.REACT_APP_APIKEY;
    const { id } = this.props.match.params;
    let { page } = queryString.parse(this.props.location.search);
    if (!page) page = 1;

    const path = `${baseurl}person/${id}?api_key=${apikey}&append_to_response=movie_credits&page=${page}`;
    try {
      const { data } = await getData(path);
      this.setState({
        person: data,
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
    else return "/static/profile.jpg";
  }
  getBiography(info) {
    return info ? <p>{info}</p> : <p>No Biography Available</p>;
  }

  render() {
    const { person } = this.state;
    if (person) document.title = `${titleCase(person.name)} - Profile`;
    if (this.state.renderSplashScreen) return <SplashScreen />;
    else if (this.state.notFound) return <NotFound />;
    else
      return (
        <div className="personContainer">
          <SearchBar history={this.props.history} />
          {person && (
            <div className="personBox row">
              <div className="personImage col-lg-4">
                <img
                  src={this.getImageSource(person.profile_path)}
                  alt={person.name}
                />
              </div>
              <div className="personInfo col-lg-8">
                <div className="personTitle">
                  <h2>{person.name}</h2>
                  {person.birthday && (
                    <p>
                      <b>{`Date Of Birth: ${person.birthday}`}</b>
                    </p>
                  )}
                  {person.deathday && (
                    <p>
                      <b>{`Date Of Death: ${person.deathday}`}</b>
                    </p>
                  )}
                </div>
                <div className="personBiography">
                  <h4>Biography</h4>
                  {this.getBiography(person.biography)}
                </div>
                <div className="personButton">
                  {getButton(person.homepage, "Website", "fa fa-link")}
                  {getButton(person.imdb_id, "IMDB", "fa fa-imdb")}
                </div>
              </div>
            </div>
          )}
          <div>
            {person && (
              <div>
                <p className="lead breadcrumbMainHeading">Acted In</p>
                <p className="breadcrumbSubHeading">Movies</p>
                <MovieItemContainer movies={person.movie_credits.cast} />
              </div>
            )}
          </div>
        </div>
      );
  }
}

export default Person;
