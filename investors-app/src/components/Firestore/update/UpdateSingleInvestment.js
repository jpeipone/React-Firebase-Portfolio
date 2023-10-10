import React from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, increment } from "firebase/firestore";

export const UpdateSingleInvestment = async (
  id,
  UIDinvestor,
  name,
  amount,
  price,
  cost,
  cashInvested,
  boughtDate
) => {
  try {
    if (UIDinvestor === null) {
      return;
    }
    //reference investment location in firestore
    const userSummaryRef = doc(db, "investors", UIDinvestor, "investments", id);

    const tempValue = Number(parseFloat((amount * price).toFixed(2)));

    //structure of new investment data
    const UpdateInvestment = {
      name: name,
      price: price,
      amount: amount,
      cost: cost,
      cashInvested: cashInvested,
      boughtDate: boughtDate,
      value: tempValue,
    };

    await setDoc(userSummaryRef, UpdateInvestment, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
