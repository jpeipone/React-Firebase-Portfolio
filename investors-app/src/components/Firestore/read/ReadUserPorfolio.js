import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const ReadUserPorfolio = async (
  UIDinvestor,
  setPortfolioUser,
  portfolioUser
) => {
  //Firestore location of investor investments based on uid
  if (UIDinvestor === null) {
    return;
  }

  const investorPorfolioRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  try {
    const queryPortfolioSnapshot = await getDoc(investorPorfolioRef);

    // setPortfolioUser(resultPortfolio);
    const investorPortfolio = queryPortfolioSnapshot?.data();
    if (investorPortfolio !== null) {
      //without this gives typerError: cannot read properties of null
      setPortfolioUser(investorPortfolio);
    }
  } catch (error) {
    console.error(error);
  }
};
