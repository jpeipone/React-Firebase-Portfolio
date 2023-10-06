import { deleteUser } from "firebase/auth";

import { auth } from "../../firebaseConfig";

export const DeleteUserAccount = async () => {
  const userDelete = auth?.currentUser;

  try {
    await deleteUser(userDelete);
  } catch (error) {
    console.error(error);
  }
};
