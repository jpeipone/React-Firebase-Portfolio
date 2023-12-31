import React from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, increment } from "firebase/firestore";

export const SummaryUserInvestments = async (
  UIDinvestor,
  assetSum,
  cashInvested,
  value,
  previouslyPositiveOrNegative
) => {
  //reference summary collection
  const userSummaryRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  let positiveA = 0;
  let negativeA = 0;
  if (value > cashInvested) {
    positiveA = 1;
  } else if (value <= cashInvested) {
    //negative or even(0) now negative asset
    negativeA = 1;
  } else if (value - cashInvested === 0) {
    negativeA = 1;
  } else {
    positiveA = 0;
    negativeA = 0;
  }

  //if investment flips from positive to negative or vice versa
  if (previouslyPositiveOrNegative !== null) {
    if (previouslyPositiveOrNegative === "positive") {
      positiveA = -1;
    } else if (previouslyPositiveOrNegative === "negative") {
      negativeA = -1;
    } else if (previouslyPositiveOrNegative === "same") {
      //quarantees that NegativeAssetsSum and PositiveAssetsSum stays the same
      positiveA = 0;
      negativeA = 0;
    }
  }

  const summaryInvesments = {
    AssetsSum: increment(assetSum),
    NegativeAssetsSum: increment(negativeA),
    PositiveAssetsSum: increment(positiveA),
    TotalCost: increment(cashInvested),
    TotalValue: increment(value),
  };
  try {
    await setDoc(userSummaryRef, summaryInvesments, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
