import { useContext } from "react";
import { UserContext } from "../../ContextData";
import "./GuideToPortfolio.css";
import { Link } from "react-router-dom";

const GuideToPortfolio = () => {
  const { logged } = useContext(UserContext);

  return (
    <div>
      {logged === false && (
        <div className="guide-container">
          <div className="guide-parent">
            <h2 className="guide__hd"> Free Portfolio Tracker</h2>
            <p>Create account to start tracking investments</p>
            <div className="guide__steps">
              <Link to="/login">
                <button className="guide-register__btn">
                  register {">"} log in
                </button>
              </Link>
              <p>
                {">"} manage {">"} view{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideToPortfolio;
