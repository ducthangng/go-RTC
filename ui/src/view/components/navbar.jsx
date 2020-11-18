import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  const name = useSelector((state) => state.userName);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="#">
        Hello {name}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link " to="#">
            Home <span className="sr-only">(current)</span>
          </Link>
          <Link className="nav-item nav-link text-danger " to="#">
            Log out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
