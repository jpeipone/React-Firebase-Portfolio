import { useContext, useState, useRef } from "react";
import { UserContext } from "../../ContextData";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [accountCreated, setAccountCreated] = useState("");
  const recaptcha = useRef();

  const handleRegisterUser = async (event) => {
    event.preventDefault(); //prevents refreshing website
    const captchaResult = recaptcha.current.getValue();
    if (!captchaResult) {
      setAccountCreated("Incorrect response, please check captcha");
      return;
    } else {
      //Authentication export
      const auth = getAuth(app);
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (response) => {
            const userMetaData = response?.user;
            const userUID = userMetaData?.uid;

            setUIDinvestor(userUID);
            setAccountCreated("Account created");
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  //reCaptcha
  const SiteKey = `${process.env.REACT_APP_SITE_KEY}`;

  return (
    <div className="register-user">
      <div className="login-container">
        <form onSubmit={handleRegisterUser}>
          <div className="login-column">
            <label className="input__label">Email</label>
            <input
              placeholder="Email"
              name="Email"
              type="username"
              className="input-username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input__label">Password</label>
            <input
              placeholder="Password"
              name="Password"
              type="Password"
              className="input-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>{accountCreated}</div>
            <button className="btn__register" type="submit">
              register
            </button>
            <ReCAPTCHA ref={recaptcha} sitekey={SiteKey} />
          </div>
        </form>
      </div>
    </div>
  );
};
