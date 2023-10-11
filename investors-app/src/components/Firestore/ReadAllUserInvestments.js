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

  const HandleReadInvestment = async () => {
    try {
      if (logged === true) {
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
        console.log("%%%%%%%%", resultInvestments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="read-investments__btn" onClick={HandleReadInvestment}>
        read investments
      </button>
    </div>
  );
};

export default ReadAllUserInvestments;
