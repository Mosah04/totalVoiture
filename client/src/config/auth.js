import Cookies from "universal-cookie";
import { auth } from "./firebase-config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";

export const userInfosCompleted = ({ displayName, email, phoneNumber }) => {
  const remainingFields = {};
  if (!displayName) remainingFields.displayName = "";
  if (!email) remainingFields.email = "";
  // if (!phoneNumber) remainingFields.phoneNumber = "";

  return [Object.keys(remainingFields).length === 0, remainingFields];
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
};

export const doUpdateUser = async (uid, data) => {
  return getAuth().updateCurrentUser(uid, data);
};

export const doSignOut = () => {
  return auth.signOut();
};

export const logOut = () => {
  const cookies = new Cookies();
  cookies.remove("totalUser", { path: "/", sameSite: true });

  return doSignOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
