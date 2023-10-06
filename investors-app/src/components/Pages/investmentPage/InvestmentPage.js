import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import "./InvestmentPage.css";

const InvestmentPage = () => {
  //Context
  const {
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
    portfolioUser,
    setPortfolioUser,
  } = useContext(UserContext);
  const { id } = useParams();

  const findInvestment = userdata.find((element) => element.id === id);
  console.log("found investment edit: ", findInvestment);
  return (
    <div className="investment-page">
      <div className="container-data">
        <div className="name-price">
          <div className="name-price__data">{findInvestment?.name} </div>
          <div className="name-price__data">{findInvestment?.price}$ </div>
        </div>
        <div className="image-data-container">
          <div className="image-investment">
            <img className="w-img" src="./images/sun.svg" alt="sun" />
          </div>
          <div className="data-colum">
            <div className="investment-wrapper">
              <label className="investment__label">Value:</label>
              <div className="investment__data">{findInvestment?.value}</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Amount:</label>
              <div className="investment__data">{findInvestment?.amount}</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Cash invested:</label>
              <div className="investment__data">
                {findInvestment?.cashInvested}
              </div>
            </div>

            <div className="investment-wrapper">
              <label className="investment__label">Price of purchase:</label>
              <div className="investment__data">{findInvestment?.cost}</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Date of purchase:</label>

              <div className="investment__data">
                {findInvestment?.boughtDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
