import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../ContextData";
import "./TableAssets.css";
import { DeleteInvestmentDoc } from "../Firestore/delete/DeleteInvestmentDoc";
import { SummaryDeleteInvestment } from "../Firestore/update/SummaryDeleteInvestment";
import { ReadUserInvestments } from "../Firestore/read/ReadUserInvestments";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";

const TableAssets = () => {
  const {
    readData,
    setReadData,
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
    setPortfolioUser,
  } = useContext(UserContext);

  //This works, but due to firestore spark quotas, it is commented away
  /*  useEffect(() => {
    if (logged === true && UIDinvestor !== null) {
      //  ReadUserPorfolio(UIDinvestor, portfolioUser, setPortfolioUser);
      ReadUserInvestments(UIDinvestor, setUserdata);
    }
  }, [logged, userdata]); */

  const handleDeleteInvestment = async (id, value, cashInvested) => {
    if (logged === true) {
      await DeleteInvestmentDoc(UIDinvestor, id);
      await SummaryDeleteInvestment(UIDinvestor, value, cashInvested);
      await ReadUserInvestments(UIDinvestor, setUserdata);
      await ReadUserPorfolio(UIDinvestor, setPortfolioUser);
    } else {
      return;
    }
  };

  const handleEditInvestment = (id) => {
    console.log("edit clicked");
  };

  return (
    <div>
      <div className="table-assets-container">
        <div className="asset-row">
          <div className="asset__hd">name</div>
          <div className="asset__price">price</div>
          <div className="asset__profit">return</div>
          <div className="asset__value">value</div>

          <div className="asset__amount">amount</div>
        </div>
        {userdata
          ? userdata.map((investment) => (
              <div className="asset-row" key={investment?.id}>
                <Link to={`/show/investment/${investment?.id}`}>
                  {investment?.value - investment?.cashInvested > 0 ? (
                    <img
                      className="weather-img"
                      src="./images/YellowSun.svg"
                      alt="sunny"
                    />
                  ) : (
                    <img
                      className="weather-img"
                      src="./images/snowflakeBlue.svg"
                      alt="snowflake"
                    />
                  )}
                </Link>
                <Link to={`/show/investment/${investment?.id}`}>
                  <div className="asset__name">{investment?.name}</div>
                </Link>
                <Link to={`/show/investment/${investment?.id}`}>
                  <div className="asset__price">{investment?.price}$</div>
                </Link>
                <Link to={`/show/investment/${investment?.id}`}>
                  <div
                    className={
                      investment?.value - investment?.cashInvested >= 0
                        ? "positive__profit"
                        : "negative__profit"
                    }
                  >
                    {Number(
                      parseFloat(
                        (investment?.value - investment?.cashInvested).toFixed(
                          2
                        )
                      )
                    )}
                    $
                  </div>
                </Link>
                <Link to={`/show/investment/${investment?.id}`}>
                  <div className="asset__value"> {investment?.value}$</div>
                </Link>
                <Link to={`/show/investment/${investment?.id}`}>
                  <div className="asset__amount">{investment?.amount}$</div>
                </Link>
                <Link to={`/edit/investment/${investment?.id}`}>
                  <button
                    className="asset-edit__btn"
                    onClick={() => handleEditInvestment(investment?.id)}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  className="asset-delete__btn"
                  onClick={() =>
                    handleDeleteInvestment(
                      investment?.id,
                      investment?.value,
                      investment?.cashInvested
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default TableAssets;
