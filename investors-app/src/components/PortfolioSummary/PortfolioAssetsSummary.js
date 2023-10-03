import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";
import { Chart } from "react-google-charts";
import "./PortfolioAssetsSummary.css";

const PortfolioAssetsSummary = () => {
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

  const [assetsProfitablePercent, setAssetsProfitablePercent] = useState(0);
  const [assetsSummary, setAssetsSummary] = useState();
  const [pieData, setPieData] = useState([
    ["asset", "amount"],
    ["neutral", 0],
    ["loss", 2],
    ["test", 0],
    ["profit", 2],
  ]);

  /* const dataPie = [
    ["asset", "amount"],
    ["neutral", 0],
    ["loss", 2],
    ["test", 0],
    ["profit", 2],
  ]; */

  const options = { pieHole: 0.5 };

  useEffect(() => {
    if (portfolioUser != null) {
      setAssetsSummary(portfolioUser);
      const decimalsROI =
        (portfolioUser?.PositiveAssetsSum / portfolioUser?.AssetsSum) * 100;
      const roundedProfitable = parseFloat(decimalsROI.toFixed(0));
      setAssetsProfitablePercent(roundedProfitable);
      const lossA = portfolioUser?.NegativeAssetsSum;
      const profitA = portfolioUser?.PositiveAssetsSum;

      setPieData([
        ["asset", "amount"],
        ["neutral", 0],
        ["loss", lossA],
        ["test", 0],
        ["profit", profitA],
      ]);
    }
  }, [portfolioUser]);

  return (
    <div className="portfolio-assets-container">
      <Chart
        chartType="PieChart"
        data={pieData}
        options={options}
        width={"400px"}
        height={"300px"}
      />
      <div className="asset-column">
        <div className="total__assets">
          Assets in porfolio:{assetsSummary?.AssetsSum}
        </div>
        <div className="assets__profitable">
          Assets profitable: {assetsSummary?.PositiveAssetsSum}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAssetsSummary;
