import React from "react";
import { Link } from "react-router-dom";
import PortfolioValueSummary from "../PortfolioSummary/PortfolioValueSummary";
import PortfolioAssetsSummary from "../PortfolioSummary/PortfolioAssetsSummary";
import "./HomePage.css";
import TableAssets from "../TableAssets/TableAssets";
import { useContext } from "react";
import { UserContext } from "../../ContextData";

const HomePage = () => {
  const { logged } = useContext(UserContext);
  return (
    <div className="homepage">
      <div className="homepage__hd">Portfolio Summary</div>
      <div className="portfolio-summaries">
        <PortfolioValueSummary />
        <PortfolioAssetsSummary />
      </div>
      <div className="homepage-row">
        <div className="homepage__hd">My Assets</div>
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
