import { signOut } from "firebase/auth";

import { auth } from "../../firebaseConfig";

const SignOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export default SignOutUser;
