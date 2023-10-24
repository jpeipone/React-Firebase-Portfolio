import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { Chart } from "react-google-charts";
import "./PortfolioAssetsSummary.css";

const PortfolioAssetsSummary = () => {
  const { portfolioUser } = useContext(UserContext);
  const [assetsProfitablePercent, setAssetsProfitablePercent] = useState(0);
  const [assetsSummary, setAssetsSummary] = useState();
  const [pieData, setPieData] = useState([
    ["asset", "amount"],
    ["neutral", 0],
    ["loss", 2],
    ["test", 0],
    ["profit", 2],
  ]);

  const options = {
    pieHole: 0.5,
    legend: { position: "bottom" },
  };

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
      <div className="asset-column">
        <div className="asset__hd">Assets in portfolio</div>
        <div className="total__assets">{assetsSummary?.AssetsSum}</div>
        <div className="asset__hd">Profitable assets</div>

        <div className="total__assets">{assetsSummary?.PositiveAssetsSum}</div>
      </div>
      <div className="piechart-container">
        <Chart
          chartType="PieChart"
          data={pieData}
          options={options}
          width={"270px"}
          height={"230px"}
        />
      </div>
    </div>
  );
};

export default PortfolioAssetsSummary;
