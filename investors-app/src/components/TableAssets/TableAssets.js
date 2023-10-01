import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import "./TableAssets.css";
import { DeleteInvestmentDoc } from "../Firestore/delete/DeleteInvestmentDoc";

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

  const handleDeleteInvestment = (id) => {
    console.log("clicked delete btn: ", id);
    DeleteInvestmentDoc(UIDinvestor, id);
  };

  return (
    <div>
      <div className="table-assets-container">
        <div className="table__header">Your Assets</div>
        <div className="asset-row">
          <div className="asset__name">name</div>
          <div className="asset__price">price</div>
          <div className="asset__profit">return</div>
          <div className="asset__value">value</div>

          <div className="asset__cost">invested</div>
          <div className="asset__amount">amount</div>
        </div>
        {userdata
          ? userdata.map((investment) => (
              <div className="asset-row" key={investment?.id}>
                <div className="asset__name">{investment?.name}</div>
                <div className="asset__price">{investment?.price}</div>
                <div
                  className={
                    investment?.price * investment?.amount - investment?.cost >=
                    0
                      ? "positive__profit"
                      : "negative__profit"
                  }
                >
                  {investment?.price * investment?.amount - investment?.cost}$
                </div>
                <div className="asset__value"> {investment?.value}</div>

                <div className="asset__cost">{investment?.cost} </div>
                <div className="asset__amount">{investment?.amount}</div>
                <button
                  className="asset-delete__btn"
                  onClick={() => handleDeleteInvestment(investment?.id)}
                >
                  delete
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default TableAssets;
