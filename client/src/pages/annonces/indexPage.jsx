import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import car1 from "../../assets/images/car-audi1.png";
import { CiUser } from "react-icons/ci";
import { GiGearStick, GiMoneyStack } from "react-icons/gi";
import TButton from "../../components/TButton";
import { getAnnonces } from "../../api";
const { REACT_APP_BACKEND_URL } = process.env;

const AnnonceIndex = ({ annonces }) => {
  // let annonces = null;
  const nFormatter = function (num, digits = 1) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
      ? (num / item.value)
          .toFixed(digits)
          .replace(regexp, "")
          .concat(item.symbol)
      : "0";
  };
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center space-y-2">
        <form className="max-w-40">
          <select className="bg-gray-50 border border-gray-300  text-sm rounded-full outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 ">
            <option defaultValue="">Marque de voiture</option>
            <option defaultValue="Toyota">Toyota</option>
            <option defaultValue="Bugatti">Bugatti</option>
            <option defaultValue="Bugatti">Rolls Royce</option>
            <option defaultValue="Bugatti">Ferrari</option>
          </select>
        </form>

        <div className="flex gap-2 justify-center">
          <Link to="/annonces/create">
            <TButton className="min-w-fit p-2" type="button">
              Publier une offre
            </TButton>
          </Link>
          <TButton className="min-w-fit p-2" type="button">
            Voir mes offres
          </TButton>
        </div>
      </div>
      <div className="mt-4 containerA">
        {annonces &&
          annonces.map((annonce, i) => (
            <div
              key={i}
              className="inline-flex flex-col p-2 rounded-xl bg-white select-none cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-500"
            >
              <Link to={`/annonces/${annonce._id}`}>
                <div className="flex justify-between">
                  <div>
                    <p className="text-font-bold font-bold line">
                      {annonce.detailsVehicule.modele}
                    </p>
                    <span>Bénin</span>
                  </div>
                  <span className="inline-flex">
                    {!annonce.validationAdmin ? (
                      <IoBookmarkOutline className="text-xl text-primary" />
                    ) : (
                      <IoBookmark className="text-xl text-primary" />
                    )}
                  </span>
                </div>
                <div className="flex justify-center mb-2">
                  <img
                    className="max-w-[235px] max-h-[106px]"
                    src={`${REACT_APP_BACKEND_URL}/photosVoitures/${annonce.detailsVehicule.photos[0]}`}
                    alt={annonce.detailsVehicule.modele}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex gap-2 ">
                    <span className="flex">
                      <CiUser className="text-xl text-primary" />
                      <span>{annonce.detailsVehicule.places}</span>
                    </span>
                    <span className="flex">
                      <GiGearStick className="text-xl text-primary" />
                      <span>
                        {annonce.detailsVehicule.transmission
                          .charAt(0)
                          .toUpperCase() +
                          annonce.detailsVehicule.transmission.slice(1)}
                      </span>
                    </span>
                  </span>
                  <span className="flex">
                    <GiMoneyStack className="text-xl text-primary" />
                    <span className="ml-1">
                      {nFormatter(annonce.prixVehicule)}
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        {Boolean(annonces) || <div>Aucune annonce trouvée!</div>}
      </div>
    </>
  );
};

export default AnnonceIndex;
