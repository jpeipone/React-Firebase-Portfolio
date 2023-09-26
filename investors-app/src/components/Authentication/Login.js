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
          //  setUserdata(userUID);
          setUIDinvestor(userUID);
          console.log("userUID: ", userUID);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (response) => {
          const userMetaData = response?.user;
          const userUID = userMetaData?.uid;
          setUserUid(userUID);
          //setUserdata(userUID);
          setUIDinvestor(userUID);
          console.log("userUID: ", userUID);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserUid(null);
      setEmail(null);
      setPassword(null);
      setUIDinvestor(null);
      console.log("logget out user: ", userUid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    const userDelete = auth?.currentUser;

    try {
      await deleteUser(userDelete);
      setUserUid(null);
      setEmail(null);
      setPassword(null);
      setUIDinvestor(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <label className="input__label">Email:</label>
      <input
        placeholder="Email"
        name="Email"
        type="username"
        className="input-username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="input__label">password:</label>
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn__login" onClick={handleSignin}>
        sign in
      </button>
      <button className="btn__register" onClick={handleRegisterUser}>
        register
      </button>
      <button className="btn__signout" onClick={handleSignOut}>
        sign out
      </button>
      <button className="btn__delete" onClick={handleDeleteUser}>
        delete user
      </button>
    </div>
  );
};

export default Login;
