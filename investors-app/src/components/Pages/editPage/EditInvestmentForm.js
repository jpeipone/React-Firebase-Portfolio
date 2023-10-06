import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";

const EditInvestmentForm = () => {
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

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [value, setValue] = useState(0.0);
  const [boughtDate, setBoughtDate] = useState("");
  const [winLossNeutral, setWinLossNeutral] = useState(""); //status of trade comparing price to cost
  const [cashInvested, setCashInvested] = useState("");

  const Investment = userdata.find((element) => element.id === id);

  useEffect(() => {
    setName(Investment?.name);
    setAmount(Investment?.amount);
    setPrice(Investment?.price);
    setCost(Investment?.cost);
    setValue(Investment?.value);
    setBoughtDate(Investment?.boughtDate);
    setWinLossNeutral(Investment?.winLossNeutral);
    setCashInvested(Investment?.cashInvested);
  }, []);

  console.log("found investment edit: ", Investment);

  const handleEditInvestment = () => {
    console.log("edit btn clicked");
  };

  return (
    <div className="edit-form">
      <div className="form-container">
        <h2> Edit investment</h2>
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
          value={amount}
          step="0.1"
          className="input__investment"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <label className="input__label">Current price</label>
        <input
          placeholder="price"
          type="number"
          value={price}
          step="0.1"
          className="input__investment"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label className="input__label">price of buy</label>
        <input
          placeholder="cost"
          type="number"
          value={cost}
          step="0.1"
          className="input__investment"
          onChange={(e) => setCost(parseFloat(e.target.value))}
        />
        <label className="input__label">cash invested</label>
        <input
          placeholder="cash invested"
          type="number"
          value={cashInvested}
          step="0.1"
          className="input__investment"
          onChange={(e) => setCashInvested(parseFloat(e.target.value))}
        />
        <label className="input__label">Date when bought</label>
        <input
          placeholder="date"
          type="date"
          value={boughtDate}
          className="input__investment"
          onChange={(e) => setBoughtDate(e.target.value)}
        />
        <div className="form-buttons">
          <button
            className="add-investment__btn"
            onClick={handleEditInvestment}
          >
            Save edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInvestmentForm;
