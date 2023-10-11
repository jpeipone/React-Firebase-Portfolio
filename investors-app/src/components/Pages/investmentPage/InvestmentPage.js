import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import "./InvestmentPage.css";
import { DeleteInvestmentDoc } from "../../Firestore/delete/DeleteInvestmentDoc";
import { SummaryDeleteInvestment } from "../../Firestore/update/SummaryDeleteInvestment";

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

  const handleEditInvestment = (id) => {};

  const handleDeleteInvestment = (id, value, cashInvested) => {
    DeleteInvestmentDoc(UIDinvestor, id);

    SummaryDeleteInvestment(UIDinvestor, value, cashInvested);
  };

  return (
    <div className="investment-page">
      <div className="container-data">
        <div className="name-return__row">
          <div className="name-hd__data">{findInvestment?.name} </div>
          <div
            className={
              findInvestment?.value - findInvestment?.cashInvested >= 0
                ? "positive__return"
                : "negative__return"
            }
          >
            {Number(
              parseFloat(
                (findInvestment?.value - findInvestment?.cashInvested).toFixed(
                  2
                )
              )
            )}
            $
          </div>
          <div className="roi__return">
            {Number(
              parseFloat(
                (
                  ((findInvestment?.value - findInvestment?.cashInvested) /
                    findInvestment?.cashInvested) *
                  100
                ).toFixed(2)
              )
            )}
            %
          </div>
        </div>
        <div className="image-data-container">
          <div className="image-investment">
            {findInvestment?.value - findInvestment?.cashInvested > 0 ? (
              <img className="w-img" src="/images/YellowSun.svg" alt="sun" />
            ) : (
              <img
                className="w-img"
                src="/images/SnowFlakeBlue.svg"
                alt="sun"
              />
            )}
          </div>
          <div className="data-colum">
            <div className="investment-wrapper">
              <label className="investment__label">Value:</label>
              <div className="investment__data">{findInvestment?.value}$</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Amount:</label>
              <div className="investment__data">{findInvestment?.amount}</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Price:</label>
              <div className="investment__data">{findInvestment?.price}$</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Cash invested:</label>
              <div className="investment__data">
                {findInvestment?.cashInvested}$
              </div>
            </div>

            <div className="investment-wrapper">
              <label className="investment__label">Price of purchase:</label>
              <div className="investment__data">{findInvestment?.cost}$</div>
            </div>
            <div className="investment-wrapper">
              <label className="investment__label">Date of purchase:</label>

              <div className="investment__data">
                {findInvestment?.boughtDate}
              </div>
            </div>
            <Link to={`/edit/investment/${findInvestment?.id}`}>
              <button
                className="investment-edit__btn"
                onClick={() => handleEditInvestment(findInvestment?.id)}
              >
                Edit
              </button>
            </Link>
            <button
              className="investment-delete__btn"
              onClick={() =>
                handleDeleteInvestment(
                  findInvestment?.id,
                  findInvestment?.value,
                  findInvestment?.cashInvested
                )
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
