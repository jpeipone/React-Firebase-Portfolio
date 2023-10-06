import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import "./TableAssets.css";
import { DeleteInvestmentDoc } from "../Firestore/delete/DeleteInvestmentDoc";
import { SummaryDeleteInvestment } from "../Firestore/update/SummaryDeleteInvestment";

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
  } = useContext(UserContext);

  const handleDeleteInvestment = (id, value, cashInvested) => {
    DeleteInvestmentDoc(UIDinvestor, id);
    SummaryDeleteInvestment(UIDinvestor, value, cashInvested);
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
                {investment?.value - investment?.cashInvested > 0 ? (
                  <img className="weather-img" src="./images/YellowSun.svg" />
                ) : (
                  <img
                    className="weather-img"
                    src="./images/snowflakeBlue.svg"
                  />
                )}
                <div className="asset__name">{investment?.name}</div>

                <div className="asset__price">{investment?.price}</div>
                <div
                  className={
                    investment?.value - investment?.cashInvested >= 0
                      ? "positive__profit"
                      : "negative__profit"
                  }
                >
                  {Number(
                    parseFloat(
                      (investment?.value - investment?.cashInvested).toFixed(2)
                    )
                  )}
                </div>
                <div className="asset__value"> {investment?.value}</div>

                <div className="asset__amount">{investment?.amount}</div>
                <button
                  className="asset-edit__btn"
                  onClick={() => handleEditInvestment(investment?.id)}
                >
                  Edit
                </button>
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
