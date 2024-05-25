import React from "react";
import { Routes, Route } from "react-router-dom";
import DemandeIndex from "./demandes";
import DemandeShow from "./demandes/show";

const Demande = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">
        Demandes d'importation
      </h1>
      <div className="w-full">
        <Routes>
          <Route path="" element={<DemandeIndex />} />
          <Route path="edit" element={<div>Edit oh</div>} />
          <Route path="show" element={<DemandeShow />} />
          <Route path="hide" element={<div>Hide oh</div>} />
          <Route path="*" element={<div>Not found x(</div>} />
        </Routes>
      </div>
    </section>
  );
};

export default Demande;
