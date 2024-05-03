import React from "react";
import AnnonceIndex from "./annonces/indexPage";
import { Route, Routes, Outlet } from "react-router-dom";
const Annonces = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">Annonces</h1>
      <div className="w-full">
        <Routes>
          <Route index element={<AnnonceIndex />} />
        </Routes>
        <Outlet />
      </div>
    </section>
  );
};

export default Annonces;
