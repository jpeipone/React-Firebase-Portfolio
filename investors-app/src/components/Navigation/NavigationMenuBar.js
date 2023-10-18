import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../ContextData";
import "./NavigationMenuBar.css";
import SignOutUser from "../Authentication/SignOutUser";

const NavigationMenuBar = () => {
  const { userdata, setUserdata, logged, setLogged, setPortfolioUser } =
    useContext(UserContext);

  const [showHamburger, setShowHamburger] = useState(false);

  const handleShowHamburgerMenu = () => {
    setShowHamburger(!showHamburger);
  };

  const handleLogOut = () => {
    SignOutUser(logged, setLogged);
    setUserdata(null);
    setPortfolioUser(null);
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
          {logged === true && (
            <li className="menu-items">
              <Link to="/login" className="navlink-item">
                account
              </Link>
            </li>
          )}
          {logged === false && (
            <li className="menu-items">
              <Link to="/login" className="navlink-item">
                log in
              </Link>
            </li>
          )}
          {logged === true && (
            <li className="menu-items">
              <div className="logout-item" onClick={handleLogOut}>
                log out
              </div>
            </li>
          )}
        </ul>
        <div
          className={showHamburger ? "hamburger-x" : "hamburger-menu"}
          onClick={handleShowHamburgerMenu}
        >
          {!showHamburger && <div className="burger" />}
          {!showHamburger && <div className="burger" />}
          {!showHamburger && <div className="burger" />}
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
            log in / account
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationMenuBar;
