import React from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, increment } from "firebase/firestore";

export const SummaryUserInvestments = async (
  UIDinvestor,
  assetSum,
  cashInvested,
  value
) => {
  //reference summary collection
  const userSummaryRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  const summaryInvesments = {
    AssetsSum: increment(assetSum),
    NegativeAssetsSum: 8,
    PositiveAssetsSum: 3,
    TotalCost: increment(cashInvested),
    TotalValue: increment(value),
  };

  await setDoc(userSummaryRef, summaryInvesments, { merge: true });
};
