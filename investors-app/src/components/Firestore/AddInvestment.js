import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { db } from "../../firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";
import { SummaryUserInvestments } from "./update/SummaryUserInvestments";

const AddInvestment = () => {
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

  //Firestore investors collection reference
  const investorCollectionRef = collection(db, "investors");
  // const UID = userdata;
  const UID = UIDinvestor;

  //structure of new investment data
  const newInvestment = {
    name: "Bitcoin",
    price: 26000,
    value: 7000,
    amount: 0.5,
    cost: 30000,
    date: "4.1.2022",
  };

  const handleAddInvestment = () => {
    //investor own document
    if (UIDinvestor != null) {
      const investorDocument = doc(investorCollectionRef, UIDinvestor); //gives error if uid empty: unction doc() cannot be called with an empty path.

      //investor subcollection that contains investors own investments
      const investorInvestmentsCollection = collection(
        investorDocument,
        "investments"
      );

      addDoc(investorInvestmentsCollection, newInvestment);
      console.log("clicked");
    }
    //     investmentCollection.addDoc(newInvestment);
    //testing update Summary
    SummaryUserInvestments(UIDinvestor, 1, 50, 89);
    //testing ends
  };

  return (
    <div>
      <button className="add-investment__btn" onClick={handleAddInvestment}>
        add test
      </button>
    </div>
  );
};

export default AddInvestment;
