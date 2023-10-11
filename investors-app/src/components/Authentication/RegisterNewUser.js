import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Login.css";

export const RegisterNewUser = () => {
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

  const handleRegisterUser = async () => {
    //Authentication export
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (response) => {
          const userMetaData = response?.user;
          const userUID = userMetaData?.uid;

          setUIDinvestor(userUID);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-user">
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
          <button className="btn__register" onClick={handleRegisterUser}>
            register
          </button>
        </div>
      </div>
    </div>
  );
};
