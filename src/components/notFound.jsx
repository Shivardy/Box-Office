import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Sorry!</h2>
      <h3>Page Not Found</h3>
      <Link to="/" className="button">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
