import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../ContextData";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const ReadUserPorfolio = async (
  UIDinvestor,
  setPortfolioUser,
  portfolioUser
) => {
  //  const { portfolioUser, setPortfolioUser } = useContext(UserContext);

  //Firestore location of investor investments based on uid
  if (UIDinvestor === null) {
    return;
  }

  console.log("//////////////////fetchPorfolio");
  const investorPorfolioRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  try {
    const queryPortfolioSnapshot = await getDoc(investorPorfolioRef);

    /*   const resultPortfolio = queryInvestmentsSnapshot.docs.map((doc) => ({
    ...doc.data(),
  })); */

    // setPortfolioUser(resultPortfolio);
    const investorPortfolio = queryPortfolioSnapshot?.data();
    if (investorPortfolio !== null) {
      //without this gives typerError: cannot read properties of null
      setPortfolioUser(investorPortfolio);
    }
    //  console.log("Investor Portfolio summery:", investorPortfolio);
  } catch (error) {
    console.error(error);
  }
};
