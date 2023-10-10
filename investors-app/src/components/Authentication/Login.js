import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Login.css";
import { ReadUserInvestments } from "../Firestore/read/ReadUserInvestments";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";

const Login = () => {
  //Authentication exportt
  const auth = getAuth(app);
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
    portfolioUser,
    setPortfolioUser,
  } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userUid, setUserUid] = useState();

  //console.log(auth?.currentUser?.email);
  //console.log("current user", auth?.currentUser);

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          const userMetaData = response?.user;
          const userUID = userMetaData?.uid;
          setUserUid(userUID);
          setUIDinvestor(userUID);
          console.log("userUID: ", userUID);
          if (userUID !== null) {
            setLogged(true);
          }
        }
      );
      if (UIDinvestor !== null) {
        await ReadUserInvestments(UIDinvestor, setUserdata); //fetch from firestore user investments
        await ReadUserPorfolio(UIDinvestor, setPortfolioUser, portfolioUser); //fetch from firestore user portfolio
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-column">
        <label className="input__label">Email</label>
        <input
          placeholder="Email"
          name="Email"
          type="username"
          className="input-username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="input__label">Password</label>
        <input
          placeholder="Password"
          name="Password"
          type="Password"
          className="input-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn__login" onClick={handleSignin}>
          sign in
        </button>
      </div>
      {/*  <button className="btn__register" onClick={handleRegisterUser}>
        register
      </button> */}
      {/*  <button className="btn__signout" onClick={handleSignOut}>
        sign out
      </button> */}
      {/* <button className="btn__delete" onClick={handleDeleteUser}>
        delete user
      </button> */}
    </div>
  );
};

export default Login;
