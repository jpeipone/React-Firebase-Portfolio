import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { db } from "../../firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";

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
    name: "Apple",
    price: 65,
    value: 444,
    amount: 7,
    cost: 60,
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
