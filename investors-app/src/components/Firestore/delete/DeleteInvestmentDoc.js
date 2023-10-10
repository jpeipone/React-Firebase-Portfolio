import React from "react";

import { db } from "../../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const DeleteInvestmentDoc = async (UIDinvestor, documentId) => {
  try {
    await deleteDoc(
      doc(db, "investors", UIDinvestor, "investments", documentId)
    );
  } catch (error) {
    console.error(error);
  }
};
