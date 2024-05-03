import React from "react";
import { Link } from "react-router-dom";

import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import car1 from "../../assets/images/car-audi1.png";
import { CiUser } from "react-icons/ci";
import { GiGearStick, GiMoneyStack } from "react-icons/gi";
import TButton from "../../components/TButton";

const AnnonceIndex = () => {
  const elements = new Array(20).fill(0);
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
        {elements.map((e, i) => (
          <div
            key={i}
            className="inline-flex flex-col p-2 rounded-xl bg-white select-none"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-font-bold font-bold line">
                  Porshe 718 Cayman S
                </p>
                <span>Bénin</span>
              </div>
              <span className="inline-flex">
                <IoBookmarkOutline className="text-xl text-primary" />
                <IoBookmark className="text-xl text-primary" />
              </span>
            </div>
            <div className="flex justify-center mb-2">
              <img
                className="max-w-[235px] max-h-[106px]"
                src={car1}
                alt="car1"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="flex gap-2 ">
                <span className="flex">
                  <CiUser className="text-xl text-primary" />
                  <span>4</span>
                </span>
                <span className="flex">
                  <GiGearStick className="text-xl text-primary" />
                  <span>Automatique</span>
                </span>
              </span>
              <span className="flex">
                <GiMoneyStack className="text-xl text-primary" />
                <span className="ml-1">1,6M</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnnonceIndex;
