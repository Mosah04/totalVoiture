import React from "react";
import { Routes, Route } from "react-router-dom";
import AssuranceIndex from "./assurances";
const Assurance = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">Assurances</h1>
      <div className="w-full">
        <Routes>
          <Route path="" element={<AssuranceIndex />} />
          <Route path="edit" element={<div>Edit oh</div>} />
          <Route path="show" element={<div>show oh</div>} />
          <Route path="hide" element={<div>Hide oh</div>} />
          <Route path="*" element={<div>Not found x(</div>} />
        </Routes>
      </div>
    </section>
  );
};

export default Assurance;
