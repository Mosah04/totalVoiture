import React from "react";
import AnnonceIndex from "./annonces/indexPage";
import { Route, Routes, Outlet, useLoaderData } from "react-router-dom";
const Annonces = () => {
  const { annonces } = useLoaderData();
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">Annonces</h1>
      <div className="w-full">
        <Routes>
          <Route index element={<AnnonceIndex annonces={annonces} />} />
        </Routes>
        <Outlet />
      </div>
    </section>
  );
};

export default Annonces;
