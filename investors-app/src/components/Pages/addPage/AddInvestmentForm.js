import { useContext, useState } from "react";
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
  const [addedInvestment, setAddedInvestment] = useState("");

  const handleAddInvestment = async (event) => {
    event.preventDefault(); //prevents refreshing website
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
    const AddedName = "saved " + name;

    setAddedInvestment(AddedName);
  };

  return (
    <div className="add-form">
      <form onSubmit={handleAddInvestment}>
        <div className="form-container">
          <h2> Add new investment</h2>
          <label className="input__label">Name</label>
          <input
            placeholder="name"
            type="text"
            className="input__investment"
            maxLength={10}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label className="input__label">Amount</label>
          <input
            placeholder="amount"
            type="number"
            step="any"
            className="input__investment"
            required
            onChange={(e) => {
              const commaToSpot = e.target.value.replace(",", ".");
              setAmount(parseFloat(commaToSpot));
            }}
          />
          <label className="input__label">Current price</label>
          <input
            placeholder="price"
            type="number"
            step="any"
            className="input__investment"
            required
            onChange={(e) => {
              const commaToSpot = e.target.value.replace(",", ".");
              setPrice(parseFloat(commaToSpot));
            }}
          />
          <label className="input__label">Purchase price</label>
          <input
            placeholder="purchase price"
            type="number"
            step="any"
            className="input__investment"
            required
            onChange={(e) => {
              const commaToSpot = e.target.value.replace(",", ".");
              setCost(parseFloat(commaToSpot));
            }}
          />
          <label className="input__label">Cash invested</label>
          <input
            placeholder="cash invested"
            type="number"
            step="any"
            className="input__investment"
            required
            onChange={(e) => {
              const commaToSpot = e.target.value.replace(",", ".");
              setCashInvested(parseFloat(commaToSpot));
            }}
          />
          <label className="input__label">Date of purchase</label>
          <input
            placeholder="date"
            type="date"
            className="input__investment"
            onChange={(e) => setBoughtDate(e.target.value)}
          />
          <div className="form-buttons">
            <button className="add-investment__btn" type="submit">
              Add
            </button>
          </div>
          <div className="added-name">{addedInvestment}</div>
        </div>
      </form>
    </div>
  );
};

export default AddInvestmentForm;
