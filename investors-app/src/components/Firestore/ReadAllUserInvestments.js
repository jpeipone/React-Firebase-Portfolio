import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { db } from "../../firebaseConfig";
import { getDocs, collection, doc, query } from "firebase/firestore";

const ReadAllUserInvestments = () => {
  const {
    readData,
    setReadData,
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
  } = useContext(UserContext);

  const handleReadInvestment = () => {
    if (UIDinvestor != null) {
      //Firestore location of investor investments based on uid
      const investorInvestmentsCollectionRef = collection(
        db,
        "investors",
        UIDinvestor,
        "investments"
      );

      //query
      const queryObject = query(investorInvestmentsCollectionRef);
      //retrieve data from firestore queryInvestmentsSnapshot

      const queryInvestorInvestmentsSnapshot = getDocs(queryObject).then(
        (investment) => {
          investment.forEach((doc) => {
            const investmentDoc = doc?.data();
            console.log(
              "investment id: ",
              doc?.id,
              "investment: ",
              investmentDoc
            );
          });
        }
      );
    }
  };

  return (
    <div>
      <button className="read-investments__btn" onClick={handleReadInvestment}>
        read investments
      </button>
    </div>
  );
};

export default ReadAllUserInvestments;
