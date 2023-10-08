import { signOut } from "firebase/auth";

import { auth } from "../../firebaseConfig";

const SignOutUser = async (logged, setLogged) => {
  try {
    await signOut(auth);
    setLogged(false);
  } catch (error) {
    console.error(error);
  }
};

export default SignOutUser;
