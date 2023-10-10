import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import "./AddInvestmentForm.css";
import AddNewInvestment from "../../Firestore/create/AddNewInvestment";
import { ReadUserInvestments } from "../../Firestore/read/ReadUserInvestments";
import { ReadUserPorfolio } from "../../Firestore/read/ReadUserPorfolio";

const AddInvestmentForm = () => {
  const { UIDinvestor, setUserdata, setPortfolioUser, logged } =
    useContext(UserContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [value, setValue] = useState(0.0);
  const [boughtDate, setBoughtDate] = useState("");
  const [winLossNeutral, setWinLossNeutral] = useState(""); //status of trade comparing price to cost
  const [cashInvested, setCashInvested] = useState("");

  const handleAddInvestment = async () => {
    await AddNewInvestment(
      UIDinvestor,
      name,
      amount,
      price,
      cost,
      cashInvested,
      boughtDate
    );

    await ReadUserInvestments(UIDinvestor, setUserdata);
    await ReadUserPorfolio(UIDinvestor, setPortfolioUser);
  };

  const handleResetForm = () => {
    setName(null);
    setAmount(null);
    setPrice(null);
    setCost(null);
    setValue(null);
    setBoughtDate(null);
    setWinLossNeutral(null);
    setCashInvested(null);
  };

  return (
    <div className="add-form">
      <div className="form-container">
        <h2> Add new investment</h2>
        <label className="input__label">Name</label>
        <input
          placeholder="name"
          type="text"
          value={name}
          className="input__investment"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="input__label">Amount</label>
        <input
          placeholder="amount"
          type="number"
          step="0.1"
          className="input__investment"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <label className="input__label">Current price</label>
        <input
          placeholder="price"
          type="number"
          step="0.1"
          className="input__investment"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label className="input__label">purchase price</label>
        <input
          placeholder="purchase price"
          type="number"
          step="0.1"
          className="input__investment"
          onChange={(e) => setCost(parseFloat(e.target.value))}
        />
        <label className="input__label">cash invested</label>
        <input
          placeholder="cash invested"
          type="number"
          step="0.1"
          className="input__investment"
          onChange={(e) => setCashInvested(parseFloat(e.target.value))}
        />
        <label className="input__label">Date when bought</label>
        <input
          placeholder="date"
          type="date"
          className="input__investment"
          onChange={(e) => setBoughtDate(e.target.value)}
        />
        <div className="form-buttons">
          <button className="add-investment__btn" onClick={handleAddInvestment}>
            Add
          </button>
          <button className="reset-form__btn" onClick={handleResetForm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInvestmentForm;
