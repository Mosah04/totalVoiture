import React from "react";
import SuperInput from "../../components/SuperInput";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const AnnonceCreate = () => {
  return (
    <div className="bg-white p-2">
      <h2 className="text-font-bold font-bold text-xl text-center">
        Créez une annonce
      </h2>
      <form action="">
        <div className="flex flex-wrap justify-between border">
          <SuperInput
            htmlFor="marqueInput"
            labelText="Marque du véhicule"
            name="marqueVehicule"
            placeholder="Toyota"
            type="text"
            className="flex-shrink-0 min-w-[300px]"
          />
          <SuperInput
            htmlFor="modeleInput"
            labelText="Modèle du véhicule"
            name="modeleVehicule"
            placeholder="Corola"
            type="text"
            className="flex-shrink-0 min-w-[300px]"
          />
        </div>
        <div className="flex flex-wrap justify-between border">
          <SuperInput
            htmlFor="anneeInput"
            labelText="Année de sortie du véhicule"
            name="anneeVehicule"
            placeholder="2000"
            type="number"
            className="flex-shrink-0 min-w-[300px]"
          />
          <SuperInput
            htmlFor="prixInput"
            labelText="Prix du véhicule"
            name="prixVehicule"
            placeholder="300000"
            type="number"
            className="flex-shrink-0 min-w-[300px]"
          />
        </div>
        <div>
          <label htmlFor="">Le véhicule est-il déjà régularisé?</label>
          <Toggle
            id="cheese-status"
            className="checked:bg-primary"
            icons={false}
            // defaultChecked={this.state.cheeseIsReady}
            // onChange={this.handleCheeseChange}
          />
          <label htmlFor="cheese-status">Adjacent label tag</label>
        </div>
        <label htmlFor="descriptionInput">Description de l'annonce</label>
        <textarea
          name="description"
          id="descriptionInput"
          placeholder="Entrez une description ici"
          className="w-full outline-none"
          rows="10"
        ></textarea>
        <div></div>
      </form>
    </div>
  );
};

export default AnnonceCreate;
