import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import "../css/sidebar.css";
class Sidebar extends Component {
  state = {
    menuOpen: false
  };
  closeMenu() {
    this.setState({ menuOpen: false });
  }
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  render() {
    const { genres } = this.props;
    return (
      <Menu
        disableAutoFocus
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <h2 className="subHeading sideBarSubHeading">Discover</h2>
        <NavLink
          to="/discover/popular"
          className="menu-item"
          onClick={() => this.closeMenu()}
        >
          Popular
        </NavLink>
        <NavLink
          to="/discover/top_rated"
          className="menu-item"
          onClick={() => this.closeMenu()}
        >
          Top Rated
        </NavLink>
        <NavLink
          to="/discover/upcoming"
          className="menu-item"
          onClick={() => this.closeMenu()}
        >
          Upcoming
        </NavLink>
        <NavLink
          to="/discover/now_playing"
          className="menu-item"
          onClick={() => this.closeMenu()}
        >
          Now Playing
        </NavLink>
        <NavLink
          to="/trending/movies"
          className="menu-item"
          onClick={() => this.closeMenu()}
        >
          Trending
        </NavLink>

        <hr className="hr_line" />
        <h2 className="subHeading sideBarSubHeading">Genres</h2>
        {genres.map(genre => (
          <NavLink
            to={"/genres/" + genre.name}
            className="menu-item"
            key={genre}
            onClick={() => this.closeMenu()}
          >
            {genre.name}
          </NavLink>
        ))}
        <hr className="hr_line" />
        <a
          href="http://www.suramshivareddy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>Shiva Reddy</h6>
        </a>
        <a
          href="https://themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>The Movie DB</h6>
        </a>
      </Menu>
    );
  }
}

export default Sidebar;
