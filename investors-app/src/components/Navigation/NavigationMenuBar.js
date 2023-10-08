import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import "./NavigationMenuBar.css";

const NavigationMenuBar = () => {
  const {
    readData,
    setReadData,
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
  } = useContext(UserContext);
  return (
    <nav className="menubar">
      <Link to="/" className="menu-logo">
        <img
          className="menu-logo"
          src="/images/LogoPortfolioWeather.svg"
          alt="Portfolio Weather"
        />
      </Link>
      <ul>
        {logged === true && (
          <li className="menu-items">
            <Link to="/add" className="navlink-item">
              add new
            </Link>
          </li>
        )}
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
