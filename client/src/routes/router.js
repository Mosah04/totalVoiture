import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Auth from "../components/auth";
import VerifyOtp from "../pages/VerifyOtp";
import TellUsMore from "../pages/TellUsMore";
import Main from "../Main.js";
import Messages from "../pages/Messages.jsx";
import {
  annoncesLoader,
  annoncesLoaderWithId,
  annoncesLoaderWithUserId,
} from "../api/annonce.js";
import Annonces from "../pages/Annonces.jsx";
import AnnonceCreate from "../pages/annonces/create.jsx";
import AnnonceShow from "../pages/annonces/show";
import AnnonceManage from "../pages/annonces/manage.jsx";
import AnnonceEdit from "../pages/annonces/edit.jsx";
import AnnonceError from "../pages/annonces/error.jsx";
import AnnonceIndex from "../pages/annonces/indexPage.jsx";
import Assurance from "../pages/Assurance.jsx";
import Demande from "../pages/Demande.jsx";
import Settings from "../pages/Settings.jsx";
import DemandeIndex from "../pages/demandes/index.jsx";
import {
  demandesLoader,
  demandesLoaderWithId,
  demandesLoaderWithUserId,
} from "../api/demande.js";
import DemandeCreate from "../pages/demandes/create.jsx";
import DemandeShow from "../pages/demandes/show.jsx";
import DemandeManage from "../pages/demandes/manage.jsx";
import DemandeEdit from "../pages/demandes/edit.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Main />,
    children: [
      {
        path: "annonces/",
        element: <Annonces />,
        errorElement: <AnnonceError />,
        children: [
          {
            path: "",
            element: <AnnonceIndex />,
            loader: annoncesLoader,
            index: true,
          },
          {
            path: "create",
            element: <AnnonceCreate />,
          },
          {
            path: ":annonceId",
            loader: annoncesLoaderWithId,
            element: <AnnonceShow />,
          },
          {
            path: "user/:idUser",
            loader: annoncesLoaderWithUserId,
            element: <AnnonceManage />,
          },
          {
            path: ":annonceId/edit",
            loader: annoncesLoaderWithId,
            element: <AnnonceEdit />,
          },
          {
            path: "*",
            element: <div>Error 404, not found</div>,
          },
        ],
      },
      {
        path: "assurances/*",
        element: <Assurance />,
        errorElement: <AnnonceError />,
      },
      {
        path: "importations/",
        element: <Demande />,
        children: [
          {
            path: "",
            element: <DemandeIndex />,
            loader: demandesLoader,
            index: true,
          },
          {
            path: "create",
            element: <DemandeCreate />,
          },
          {
            path: "show/:demandeId",
            loader: demandesLoaderWithId,
            element: <DemandeShow />,
          },
          {
            path: "user/:idUser",
            loader: demandesLoaderWithUserId,
            element: <DemandeManage />,
          },
          {
            path: ":demandeId/edit",
            loader: demandesLoaderWithId,
            element: <DemandeEdit />,
          },
          {
            path: "*",
            element: <div>Error 404, not found</div>,
          },
        ],
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
        element: <Settings />,
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
