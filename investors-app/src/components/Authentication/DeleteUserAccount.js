import { deleteUser } from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  writeBatch,
} from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";

export const DeleteUserAccount = async (setLogged, UIDinvestor) => {
  const userDelete = auth?.currentUser;

  //References of investor document in investors collection
  const investorDocumentRef = doc(db, "investors", UIDinvestor);

  //Reference of all investments investor has
  //Firestore investors collection reference
  const investorInvestmentsRef = collection(
    db,
    "investors",
    UIDinvestor,
    "investments"
  );
  //investor subcollectin porfolio summary reference
  const investorSummaryRef = doc(
    db,
    "investors",
    UIDinvestor,
    "summary",
    "summaryInvestments"
  );

  //delete portfolio document from specific investor

  try {
    await deleteDoc(
      doc(db, "investors", UIDinvestor, "summary", "summaryInvestments")
    );
  } catch (error) {
    console.error("deletedoc", error);
  }

  try {
    // Initializing batch
    let batch = writeBatch(db);

    //query
    const queryObject = query(investorInvestmentsRef);

    const queryInvestmentsSnapshot = await getDocs(queryObject);

    //delete all investments from specific investor

    queryInvestmentsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    //delete investor document
    batch.delete(investorDocumentRef);

    await batch.commit();
  } catch (error) {
    console.error("batch", error);
  }
  try {
    await deleteUser(userDelete);
    setLogged(false);
  } catch (error) {
    console.error(error);
  }
};
