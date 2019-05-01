import React, { Component } from "react";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { query } = this.state;
    if (query.length === 0) return;
    this.props.history.push(`/search/${query}`);
  }
  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group input-group-sm mb-3">
          <input
            value={this.state.query}
            onChange={this.handleChange}
            type="text"
            className="form-control"
            placeholder="Search Movies"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
