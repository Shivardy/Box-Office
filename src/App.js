import React, { Component } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";
import Discover from "./components/discover";
import getData from "./services/http";
import Movie from "./components/movie";
import Person from "./components/person";
import NotFound from "./components/notFound";

class App extends Component {
  state = {
    genres: []
  };
  async componentDidMount() {
    const path = `${process.env.REACT_APP_BASEURL}genre/movie/list?api_key=${
      process.env.REACT_APP_APIKEY
    }`;
    const { data } = await getData(path);
    this.setState({ genres: data.genres });
  }
  render() {
    const { genres } = this.state;
    return (
      <div id="App">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          genres={genres}
        />

        <div id="page-wrap">
          <nav className="navbar fixed-top">
            <Link to="/discover/popular" className="siteHeading">
              <h1>Box Office</h1>
            </Link>
          </nav>

          <main className="container">
            <Switch>
              <Route path="/discover/:id" component={Discover} />
              <Route path="/trending/:id" component={Discover} />
              <Route
                path="/genres/:id"
                component={props => <Discover genres={genres} {...props} />}
              />
              <Route path="/movie/:id" component={Movie} />
              <Route path="/search/:id" component={Discover} />
              <Route path="/person/:id" component={Person} />
              <Route path="/not-found" component={NotFound} />

              <Route
                exact
                path="/"
                render={() => <Redirect to="/discover/popular" />}
              />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
