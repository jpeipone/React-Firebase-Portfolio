import React from "react";
import PortfolioValueSummary from "../PortfolioSummary/PortfolioValueSummary";
import PortfolioAssetsSummary from "../PortfolioSummary/PortfolioAssetsSummary";
import "./HomePage.css";
import TableAssets from "../TableAssets/TableAssets";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__hd">Portfolio Summary</div>
      <div className="portfolio-summaries">
        <PortfolioValueSummary />
        <PortfolioAssetsSummary />
      </div>
      <div className="homepage__hd">My Assets</div>
      <TableAssets />
    </div>
  );
};

export default HomePage;
