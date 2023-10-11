import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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

  const [showHamburger, setShowHamburger] = useState(false);

  const handleShowHamburgerMenu = () => {
    setShowHamburger(!showHamburger);
  };
  return (
    <div>
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
        <div
          className={showHamburger ? "hamburger-x" : "hamburger-menu"}
          onClick={handleShowHamburgerMenu}
        >
          {!showHamburger && <div className="burger burger-1" />}
          {!showHamburger && <div className="burger burger-2" />}
          {!showHamburger && <div className="burger burger-3" />}
        </div>
      </nav>
      {showHamburger === true && (
        <div className="hamburger-links">
          {logged === true && (
            <Link
              to="/add"
              className="hamburger-item"
              onClick={handleShowHamburgerMenu}
            >
              add new investment
            </Link>
          )}

          <Link
            to="/login"
            className="hamburger-item"
            onClick={handleShowHamburgerMenu}
          >
            log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationMenuBar;
