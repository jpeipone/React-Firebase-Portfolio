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

  const handleGetPortfolio = async (UIDinvestor) => {
    console.log("clicked porfolio btn");
    if (UIDinvestor === null) {
      return;
    }
    //  ReadUserPorfolio(UIDinvestor, portfolioUser, setPortfolioUser);
    await ReadUserPorfolio(UIDinvestor, setPortfolioUser);
    console.log("porfolio of user", portfolioUser);
  };

  useEffect(() => {
    setPortfolioData(portfolioUser);
    if (portfolioUser != null) {
      const moneyGained = portfolioData?.TotalValue - portfolioData?.TotalCost;
      const decimalsROI = (moneyGained / portfolioUser?.TotalCost) * 100;
      const roundedROI = parseFloat(decimalsROI.toFixed(1));
      setTotalROI(roundedROI);
    }
  }, [portfolioUser, totalROI]);

  return (
    <div>
      <div className="summary-container">
        {portfolioData?.TotalValue - portfolioData?.TotalCost > 0 ? (
          <img
            className="yellowsun-img"
            src="./images/YellowSun.svg"
            alt="Sunny"
          />
        ) : (
          <img
            className="yellowsun-img"
            src="./images/snowflakeBlue.svg"
            alt="Snowflake"
          />
        )}
        <div className="portfolio-values">
          <div className="porfolio-row">
            <div className="porfolio-column">
              <div className="value__hd">Total value</div>

              <div className="portfolio__totavalue">
                {parseFloat(portfolioData?.TotalValue).toFixed(2)}$
              </div>
            </div>
            <div className="porfolio-column">
              <div className="value__hd">Total invested</div>

              <div className="portfolio__invested">
                {portfolioData?.TotalCost}$
              </div>
            </div>
          </div>

          <div className="value__hd">Total returns</div>
          <div className="portfolio__profit">
            {Number(
              parseFloat(
                (portfolioData?.TotalValue - portfolioData?.TotalCost).toFixed(
                  2
                )
              )
            )}
            $
          </div>

          <div className="value__hd">Total ROI</div>
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
