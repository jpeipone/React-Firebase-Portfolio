import React from "react";
import { Link } from "react-router-dom";
import PortfolioValueSummary from "../PortfolioSummary/PortfolioValueSummary";
import PortfolioAssetsSummary from "../PortfolioSummary/PortfolioAssetsSummary";
import "./HomePage.css";
import TableAssets from "../TableAssets/TableAssets";
import { useContext } from "react";
import { UserContext } from "../../ContextData";
import GuideToPortfolio from "../Guide/GuideToPortfolio";

const HomePage = () => {
  const { logged } = useContext(UserContext);
  return (
    <div className="homepage">
      <GuideToPortfolio />
      <div className="portfolio-summaries">
        <PortfolioValueSummary />
        <PortfolioAssetsSummary />
      </div>
      <div className="homepage-row">
        <h2 className="homepage__hd">My Assets</h2>
        {logged && (
          <Link to="/add" className="navlink-item">
            <button className="home-add__btn">Add new</button>
          </Link>
        )}
      </div>
      <TableAssets />
    </div>
  );
};

export default HomePage;
