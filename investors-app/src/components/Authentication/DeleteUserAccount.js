import { deleteUser } from "firebase/auth";

import { auth } from "../../firebaseConfig";

export const DeleteUserAccount = async (logged, setLogged) => {
  const userDelete = auth?.currentUser;

  try {
    await deleteUser(userDelete);
    setLogged(false);
  } catch (error) {
    console.error(error);
  }
};
