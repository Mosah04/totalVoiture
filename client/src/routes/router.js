import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Auth from "../components/auth";
import VerifyOtp from "../pages/VerifyOtp";
import TellUsMore from "../pages/TellUsMore";
import Main from "../Main.js";
import Annonces from "../pages/Annonces.jsx";
import Messages from "../pages/Messages.jsx";
import AnnonceCreate from "../pages/annonces/create.jsx";
import { annoncesLoader, annoncesLoaderWithId } from "../api/annonce.js";
import AnnonceShow from "../pages/annonces/show";
import Settings from "../pages/Settings.jsx";

const router = createBrowserRouter([
  {
        path: "/*",
    element: <Main />,
    children: [
      {
        path: "annonces/*",
        loader: annoncesLoader,
        element: <Annonces />,
        children: [
          {
                    path: "create",
            element: <AnnonceCreate />,
          },
          {
            path: ":annonceId",
            loader: annoncesLoaderWithId,
            element: <AnnonceShow />,
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
        element: <Settings/>,
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
