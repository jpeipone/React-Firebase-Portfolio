import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc } from "firebase/firestore";
import { SummaryUserInvestments } from "../update/SummaryUserInvestments";

const AddNewInvestment = async (
  UIDinvestor,
  name,
  amount,
  price,
  cost,
  value,
  boughtDate,
  winLossNeutral
) => {
  //Firestore investors collection reference
  const investorCollectionRef = collection(db, "investors");

  //structure of new investment data
  const newInvestment = {
    name: name,
    price: price,
    amount: amount,
    cost: cost,
  };

  //investor own document

  const investorDocument = doc(investorCollectionRef, UIDinvestor); //gives error if uid empty: unction doc() cannot be called with an empty path.

  //investor subcollection that contains investors own investments
  const investorInvestmentsCollection = collection(
    investorDocument,
    "investments"
  );

  await addDoc(investorInvestmentsCollection, newInvestment);
  console.log("add new doc");

  //     investmentCollection.addDoc(newInvestment);
  //testing update Summary
  //  SummaryUserInvestments(UIDinvestor, 1, 50, 89);
  //testing ends
};

export default AddNewInvestment;
