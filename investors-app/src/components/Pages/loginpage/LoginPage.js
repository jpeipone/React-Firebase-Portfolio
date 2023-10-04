import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";

import Login from "../../Authentication/Login";
import "./LoginPage.css";
import { RegisterNewUser } from "../../Authentication/RegisterNewUser";
import SignOutUser from "../../Authentication/SignOutUser";

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

  const handleLogOut = () => {
    console.log("clicked sign out button");
    SignOutUser();
  };

  return (
    <div className="login-page">
      <div className="login-info-container">
        <div className="login__header">Welcome back!</div>
        <Login />
        <button className="signOut-user__btn" onClick={handleLogOut}>
          log out
        </button>
        New user?
        <div className="create-account__text">create new account</div>
        <div className="login__header">Register new account</div>
        <RegisterNewUser />
      </div>
    </div>
  );
};

export default LoginPage;
