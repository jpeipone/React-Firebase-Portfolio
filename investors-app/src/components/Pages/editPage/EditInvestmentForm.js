import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import { UpdateSingleInvestment } from "../../Firestore/update/UpdateSingleInvestment";
import { SummaryUserInvestments } from "../../Firestore/update/SummaryUserInvestments";
import { ReadUserInvestments } from "../../Firestore/read/ReadUserInvestments";
import { ReadUserPorfolio } from "../../Firestore/read/ReadUserPorfolio";

const EditInvestmentForm = () => {
  //Context
  const {
    userdata,
    setUserdata,
    logged,
    UIDinvestor,

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
  const [editedInvestment, setEditedInvestment] = useState("");

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

  const handleEditInvestment = async (event) => {
    event.preventDefault(); //prevents refreshing website

    if (logged === true && UIDinvestor !== null) {
      await UpdateSingleInvestment(
        id,
        UIDinvestor,
        name,
        amount,
        price,
        cost,
        cashInvested,
        boughtDate
      );

      //update portfolio
      const tempValue = Number(parseFloat((amount * price).toFixed(2)));
      const updateCashInvested = cashInvested - Investment?.cashInvested;
      const updateValue = tempValue - Investment?.value;

      let previouslyPositiveOrNegative = null;

      //check if asset has changed from negative to positive or vice versa
      const previousReturn = Investment?.value - Investment?.cashInvested;
      const currentReturn = tempValue - cashInvested;
      if (
        (previousReturn > 0 && currentReturn > 0) ||
        (previousReturn < 0 && currentReturn < 0)
      ) {
        previouslyPositiveOrNegative = null;
      } else if (previousReturn > 0) {
        //if negative value, its not profitable asset anymore, but was previoulsy positive
        previouslyPositiveOrNegative = "positive";
      } else if (previousReturn < 0) {
        //current return is positive, but was previously negative
        previouslyPositiveOrNegative = "negative";
      }

      await SummaryUserInvestments(
        UIDinvestor,
        0,
        updateCashInvested,
        updateValue,
        previouslyPositiveOrNegative
      );

      await ReadUserInvestments(UIDinvestor, setUserdata);
      await ReadUserPorfolio(UIDinvestor, setPortfolioUser);
      const EditedName = "saved " + name;

      setEditedInvestment(EditedName);
    } else {
      return;
    }
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleEditInvestment}>
        <div className="form-container">
          <h2> Edit investment</h2>
          <label className="input__label">Name</label>
          <input
            placeholder="name"
            type="text"
            value={name}
            className="input__investment"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label className="input__label">Amount</label>
          <input
            placeholder="amount"
            type="number"
            value={amount}
            step="0.1"
            className="input__investment"
            required
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <label className="input__label">Current price</label>
          <input
            placeholder="price"
            type="number"
            value={price}
            step="0.1"
            className="input__investment"
            required
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <label className="input__label">Purchase price</label>
          <input
            placeholder="purchase price"
            type="number"
            value={cost}
            step="0.1"
            className="input__investment"
            required
            onChange={(e) => setCost(parseFloat(e.target.value))}
          />
          <label className="input__label">Cash invested</label>
          <input
            placeholder="cash invested"
            type="number"
            value={cashInvested}
            step="0.1"
            className="input__investment"
            required
            onChange={(e) => setCashInvested(parseFloat(e.target.value))}
          />
          <label className="input__label">Date of purchase</label>
          <input
            placeholder="date"
            type="date"
            value={boughtDate}
            className="input__investment"
            onChange={(e) => setBoughtDate(e.target.value)}
          />
          <div className="form-buttons">
            <button className="add-investment__btn" type="submit">
              Save edit
            </button>
          </div>
          <div className="added-name">{editedInvestment}</div>
        </div>
      </form>
    </div>
  );
};

export default EditInvestmentForm;
