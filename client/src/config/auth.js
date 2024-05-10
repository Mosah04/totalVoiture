import Cookies from "universal-cookie";
import { auth } from "./firebase-config";
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";

const { REACT_APP_BACKEND_URL } = process.env;

export const userInfosCompleted = async ({
  displayName,
  email,
  phoneNumber,
  uid,
  stsTokenManager: { accessToken },
}) => {
  const remainingFields = {};

  let user = await getUser(accessToken, uid);

  console.log(user);

  if (user) {
    displayName = displayName || user.nom;
    email = email || user.email;
    phoneNumber = phoneNumber || user.telephone;
  }
  if (!displayName) remainingFields.displayName = "";
  if (!email) remainingFields.email = "";
  if (!phoneNumber) remainingFields.phoneNumber = "";

  return [
    Object.keys(remainingFields).length === 0 && Boolean(user.roles?.length),
    remainingFields,
  ];
};

export const getRoles = async (token) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${REACT_APP_BACKEND_URL}/roles`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.request(config);
};

export const createUser = async (token, user) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${REACT_APP_BACKEND_URL}/users`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: user,
  };
  return axios.request(config);
};

export const getUser = async (token, id) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  let config = {
    method: "GET",
    headers,
  };
  let user = null;
  await fetch(`${REACT_APP_BACKEND_URL}/users/${id}`, config)
    .then((r) => r.json())
    .then((data) => (user = data))
    .catch((err) => console.log(err));

  return user;
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

export const doSignOut = () => {
  return auth.signOut();
};

export const logOut = () => {
  const cookies = new Cookies();
  cookies.set("totalUser", null, { path: "/", sameSite: true });

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
