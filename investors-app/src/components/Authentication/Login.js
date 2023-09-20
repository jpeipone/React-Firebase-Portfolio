import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Login.css";

const Login = () => {
  //Authentication exportt
  const auth = getAuth(app);
  //Context
  const { readData, setReadData, userdata, setUserdata, logged, setLogged } =
    useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(auth?.currentUser?.email);

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    const userDelete = auth?.currentUser;
    try {
      await deleteUser(userDelete);
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
