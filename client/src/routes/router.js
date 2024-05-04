import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Auth from "../components/auth";
import VerifyOtp from "../pages/VerifyOtp";
import TellUsMore from "../pages/TellUsMore";
import Main from "../Main.js";
import Annonces from "../pages/Annonces.jsx";
import Messages from "../pages/Messages.jsx";
import AnnonceCreate from "../pages/annonces/create.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Main />,
    children: [
      {
        path: "annonces/*",
        element: <Annonces />,
        children: [
          {
            path: "create",
            element: <AnnonceCreate />,
          },
        ],
      },
      {
        path: "assurances",
        element: <div> Assurances</div>,
      },
      {
        path: "importations",
        element: <div> Importations</div>,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "users",
        element: <div> Utilisateurs</div>,
      },
      {
        path: "settings",
        element: <div> Paramètres</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/signup",
    element: <Auth />,
  },
  {
    path: "/tellUsMore",
    element: <TellUsMore />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
]);

export default router;