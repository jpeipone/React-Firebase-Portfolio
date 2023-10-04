import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationMenuBar.css";

const NavigationMenuBar = () => {
  return (
    <nav className="menubar">
      <Link to="/" className="menu-logo">
        Portfolio Weather
      </Link>
      <ul>
        <li className="menu-items">
          <Link to="/add" className="navlink-item">
            add new
          </Link>
        </li>
        <li className="menu-items">
          <Link to="/login" className="navlink-item">
            log in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenuBar;
