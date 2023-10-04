import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { db } from "../../firebaseConfig";
import { getDocs, collection, doc, query } from "firebase/firestore";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";
import "./PortfolioValueSummary.css";

const PortfolioValueSummary = () => {
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

  const [portfolioData, setPortfolioData] = useState();
  const [totalROI, setTotalROI] = useState(0);
  const handleGetPortfolio = (UIDinvestor) => {
    console.log("clicked porfolio btn");
    ReadUserPorfolio(UIDinvestor, portfolioUser, setPortfolioUser);
    console.log("porfolio of user", portfolioUser);
  };

  useEffect(() => {
    setPortfolioData(portfolioUser);
    if (portfolioUser != null) {
      const decimalsROI =
        (portfolioUser?.TotalValue / portfolioUser?.TotalCost) * 100;
      const roundedROI = parseFloat(decimalsROI.toFixed(1));
      setTotalROI(roundedROI);
    }
  }, [portfolioUser]);

  console.log("useEffect portfolio:", portfolioData);
  return (
    <div>
      <div className="summary-container">
        <img className="yellowsun-img" src="./images/snowflakeBlue.svg" />
        <div className="portfolio-values">
          <div className="porfolio-row">
            <div className="porfolio-column">
              <div className="value__hd">Total value:</div>

              <div className="portfolio__totavalue">
                {portfolioData?.TotalValue}$
              </div>
            </div>
            <div className="porfolio-column">
              <div className="value__hd">Total invested:</div>

              <div className="portfolio__invested">
                {portfolioData?.TotalCost}$
              </div>
            </div>
          </div>

          <div className="value__hd">Total returns:</div>
          <div className="portfolio__profit">
            {portfolioData?.TotalValue - portfolioData?.TotalCost}$
          </div>

          <div className="value__hd">Total ROI:</div>
          <div
            className={
              totalROI > 0
                ? "porfolio__ROI__positive"
                : "portfolio__ROI__negative"
            }
          >
            {totalROI}%
          </div>
        </div>
      </div>
      <button onClick={() => handleGetPortfolio(UIDinvestor)}>
        read Portfolio
      </button>
    </div>
  );
};

export default PortfolioValueSummary;
