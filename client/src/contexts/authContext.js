import React, { useState, useEffect, useContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

import Cookies from "universal-cookie";

const AuthContext = React.createContext();

const cookies = new Cookies();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    cookies.get("totalUser") || null
  );
  const [loggedIn, setLoggedIn] = useState(Boolean(currentUser));
  const [loading, setLoading] = useState(true);

  const initializeUser = (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setLoggedIn(true);
      cookies.set("totalUser", { ...user }, { path: "/", sameSite: true });
    } else {
      setCurrentUser(cookies.get("totalUser") || null);
      setLoggedIn(Boolean(currentUser));
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
