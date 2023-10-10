import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection, doc, query } from "firebase/firestore";

export const ReadUserInvestments = async (UIDinvestor, setUserdata) => {
  try {
    if (UIDinvestor === null) {
      return;
    }
    //Firestore location of investor investments based on uid
    const investorInvestmentsCollectionRef = collection(
      db,
      "investors",
      UIDinvestor,
      "investments"
    );
    //query
    const queryObject = query(investorInvestmentsCollectionRef);

    const queryInvestmentsSnapshot = await getDocs(queryObject);

    const resultInvestments = queryInvestmentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUserdata(resultInvestments);
  } catch (error) {
    console.error(error);
  }
};
