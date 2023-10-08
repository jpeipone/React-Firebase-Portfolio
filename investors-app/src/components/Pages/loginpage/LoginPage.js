import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";

import Login from "../../Authentication/Login";
import "./LoginPage.css";
import { RegisterNewUser } from "../../Authentication/RegisterNewUser";
import SignOutUser from "../../Authentication/SignOutUser";
import { DeleteUserAccount } from "../../Authentication/DeleteUserAccount";

const LoginPage = () => {
  //Authentication exportt
  //const auth = getAuth(app);
  //Context
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

  const [showRegister, setShowRegister] = useState(false);

  const handleLogOut = () => {
    console.log("clicked sign out button");
    SignOutUser(logged, setLogged);
  };

  const handleDeleteUserAccount = () => {
    DeleteUserAccount(logged, setLogged);
    alert("Account was deleted from database");
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
    console.log("show register clicked", showRegister);
  };

  return (
    <div className="login-page">
      <div className="login-info-container">
        {showRegister === false ? (
          <div className="login__header">Welcome back!</div>
        ) : null}
        {showRegister === false ? <Login /> : null}
        {showRegister === false && logged === true ? (
          <button className="signOut-user__btn" onClick={handleLogOut}>
            log out
          </button>
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
            Delete account
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
