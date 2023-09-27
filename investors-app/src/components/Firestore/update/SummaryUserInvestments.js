import React from "react";
import { db } from "../../../firebaseConfig";
import { setDoc, doc, increment } from "firebase/firestore";

export const SummaryUserInvestments = async (UIDinvestor) => {
  //reference summary collection
  const userSummaryRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  const summaryInvesments = {
    AssetsSum: increment(1),
    TotalCost: 11,
    TotalValue: 777,
    NegativeAssetsSum: 8,
    PositiveAssetsSum: 3,
    test: 2,
  };

  await setDoc(userSummaryRef, summaryInvesments, { merge: true });
};
