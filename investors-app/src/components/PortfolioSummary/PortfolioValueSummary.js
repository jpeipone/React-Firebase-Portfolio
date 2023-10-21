import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { db } from "../../firebaseConfig";
import { getDocs, collection, doc, query } from "firebase/firestore";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";
import "./PortfolioValueSummary.css";
import { ReadUserInvestments } from "../Firestore/read/ReadUserInvestments";

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
    if (UIDinvestor === null && logged === true) {
      return;
    }

    await ReadUserPorfolio(UIDinvestor, setPortfolioUser); //refresh PorfolioSummary content

    await ReadUserInvestments(UIDinvestor, setUserdata); //refresh TableAssets content
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
        <div className="img-container">
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
        </div>
        <div className="portfolio-values">
          <div className="porfolio-row">
            <div className="porfolio-column balance">
              <div className="value__hd balance">Total balance</div>

              <div className="portfolio__totavalue">
                {parseFloat(portfolioData?.TotalValue).toFixed(2)}$
              </div>
            </div>
            <div className="porfolio-column">
              <div className="value__hd">Total invested</div>

              <div className="portfolio__invested">
                {parseFloat(portfolioData?.TotalCost).toFixed(2)}$
              </div>
            </div>
          </div>
          <div className="porfolio-row">
            <div className="porfolio-column">
              <div className="value__hd">Total returns</div>
              <div className="portfolio__profit">
                {Number(
                  parseFloat(
                    (
                      portfolioData?.TotalValue - portfolioData?.TotalCost
                    ).toFixed(2)
                  )
                )}
                $
              </div>
            </div>
            <div className="porfolio-column">
              <div className="value__hd">Total ROI</div>
              <div
                className={
                  totalROI > 0
                    ? "portfolio__ROI__positive"
                    : "portfolio__ROI__negative"
                }
              >
                {totalROI}%
              </div>
            </div>
          </div>
          {logged === true && (
            <button
              className="refresh-porfolio__btn"
              onClick={() => handleGetPortfolio(UIDinvestor)}
            >
              &#8635; Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioValueSummary;
