import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import "./AddInvestmentForm.css";
import AddNewInvestment from "../../Firestore/create/AddNewInvestment";

const AddInvestmentForm = () => {
  const { UIDinvestor } = useContext(UserContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [value, setValue] = useState("");
  const [boughtDate, setBoughtDate] = useState("");
  const [winLossNeutral, setWinLossNeutral] = useState(""); //status of trade comparing price to cost

  const handleAddInvestment = () => {
    console.log("add new investment clicked");
    console.log("name:", name);
    AddNewInvestment(
      UIDinvestor,
      name,
      amount,
      price,
      cost,
      value,
      boughtDate,
      winLossNeutral
    );
    alert(name);
  };

  const handleResetForm = () => {
    setName(null);
    setAmount(null);
    setPrice(null);
    setCost(null);
    setValue(null);
    setBoughtDate(null);
    setWinLossNeutral(null);
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
        <label className="input__label">Bought at price</label>
        <input
          placeholder="cost"
          type="number"
          step="0.1"
          className="input__investment"
          onChange={(e) => setCost(parseFloat(e.target.value))}
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
