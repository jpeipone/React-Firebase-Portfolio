import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import { Link } from "react-router-dom";

import Login from "../../Authentication/Login";
import "./LoginPage.css";
import { RegisterNewUser } from "../../Authentication/RegisterNewUser";
import SignOutUser from "../../Authentication/SignOutUser";
import { DeleteUserAccount } from "../../Authentication/DeleteUserAccount";

const LoginPage = () => {
  //Context
  const {
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
    setUserdata,
    setPortfolioUser,
  } = useContext(UserContext);

  const [showRegister, setShowRegister] = useState(false);

  const handleLogOut = () => {
    SignOutUser(logged, setLogged);
    setUserdata(null);
    setPortfolioUser(null);
  };

  const handleDeleteUserAccount = () => {
    DeleteUserAccount(setLogged, UIDinvestor);
    setUserdata(null);
    setPortfolioUser(null);
    alert("Account was deleted from database");
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="login-page">
      <div className="login-info-container">
        {showRegister === false ? (
          <div className="login__header">Welcome back!</div>
        ) : null}

        {showRegister === false && logged === false ? <Login /> : null}

        {showRegister === false && logged === true ? (
          <div className="add-logout-container">
            <Link to="/add" className="navlink-item">
              <button className="logged-add__btn">add investment</button>
            </Link>
            <button className="signOut-user__btn" onClick={handleLogOut}>
              log out
            </button>
          </div>
        ) : null}

        {showRegister === false ? (
          <div className="create-account__text" onClick={handleShowRegister}>
            New user? Create new account
          </div>
        ) : null}
        {showRegister === true ? (
          <div className="login__header">Register new account</div>
        ) : null}
        {showRegister === true ? <RegisterNewUser /> : null}
        {showRegister === true ? (
          <div className="create-account__text" onClick={handleShowRegister}>
            Log in to new account, click here
          </div>
        ) : null}
        {logged === true && (
          <button
            className="delete-account-btn"
            onClick={handleDeleteUserAccount}
          >
            delete account
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
