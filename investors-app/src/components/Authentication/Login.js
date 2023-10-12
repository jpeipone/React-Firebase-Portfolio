import { useContext, useState, useRef } from "react";
import { UserContext } from "../../ContextData";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Login.css";
import { ReadUserInvestments } from "../Firestore/read/ReadUserInvestments";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  //Authentication exportt
  const auth = getAuth(app);
  //Context
  const {
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
  const recaptcha = useRef();

  //console.log(auth?.currentUser?.email);
  //console.log("current user", auth?.currentUser);

  const handleSignin = async () => {
    const captchaResult = recaptcha.current.getValue();
    if (!captchaResult) {
      alert("not a human");
      return;
    } else {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userMetaData = response?.user;
        const userUID = userMetaData?.uid;
        setUserUid(userUID);
        setUIDinvestor(userUID);

        if (userUID !== null) {
          setLogged(true);
          await ReadUserInvestments(userUID, setUserdata); //fetch from firestore user investments
          await ReadUserPorfolio(userUID, setPortfolioUser, portfolioUser); //fetch from firestore user portfolio
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //reCaptcha
  const SiteKey = `${process.env.REACT_APP_SITE_KEY}`;

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
          log in
        </button>
        <ReCAPTCHA ref={recaptcha} sitekey={SiteKey} />
      </div>
    </div>
  );
};

export default Login;
