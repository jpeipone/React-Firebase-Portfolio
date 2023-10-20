import React from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, increment } from "firebase/firestore";

export const SummaryDeleteInvestment = async (
  UIDinvestor,
  value,
  cashInvested
) => {
  //reference summary collection
  const userSummaryRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  let negativeValue = -Math.abs(value);
  let negativeCashInvested = -Math.abs(cashInvested);

  let negativeA = 0;
  let positiveA = 0;
  if (value > cashInvested) {
    positiveA = -1;
  } else if (value < cashInvested) {
    negativeA = -1;
  } else {
    negativeA = -1; //value-cashInvested = zero (negativly stored)
  }

  const summaryInvesments = {
    AssetsSum: increment(-1),
    NegativeAssetsSum: increment(negativeA),
    PositiveAssetsSum: increment(positiveA),
    TotalCost: increment(negativeCashInvested),
    TotalValue: increment(negativeValue),
  };

  try {
    await setDoc(userSummaryRef, summaryInvesments, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
