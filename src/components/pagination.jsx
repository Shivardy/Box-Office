import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ currentPage, totalPages, path }) => {
  return (
    <div className="paginationButton">
      <Link
        to={`${path}?page=${currentPage - 1}`}
        className={"prevButton button " + (currentPage < 2 && "disabledLink")}
      >
        <i className="fa fa-arrow-left" /> Prev
      </Link>

      <Link
        to={`${path}?page=${currentPage + 1}`}
        className={"button " + (currentPage === totalPages && "disabledLink")}
      >
        Next <i className="fa fa-arrow-right" />
      </Link>
    </div>
  );
};

export default Pagination;
