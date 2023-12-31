import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";
import { SummaryUserInvestments } from "../update/SummaryUserInvestments";

const AddNewInvestment = async (
  UIDinvestor,
  name,
  amount,
  price,
  cost,
  cashInvested,
  boughtDate
) => {
  //Firestore investors collection reference
  const investorCollectionRef = collection(db, "investors");

  const tempValue = Number(parseFloat((amount * price).toFixed(2)));

  //structure of new investment data
  const newInvestment = {
    name: name,
    price: price,
    amount: amount,
    cost: cost,
    cashInvested: cashInvested,
    boughtDate: boughtDate,
    value: tempValue,
  };

  //investor own document

  const investorDocument = doc(investorCollectionRef, UIDinvestor); //gives error if uid empty: unction doc() cannot be called with an empty path.

  //investor subcollection that contains investors own investments
  const investorInvestmentsCollection = collection(
    investorDocument,
    "investments"
  );
  try {
    await addDoc(investorInvestmentsCollection, newInvestment);
  } catch (error) {
    console.error(error);
  }

  // update portfolio Summary
  const assetSum = 1;
  const value = tempValue;
  SummaryUserInvestments(UIDinvestor, assetSum, cashInvested, value);
};

export default AddNewInvestment;
