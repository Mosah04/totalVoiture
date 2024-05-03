import mongoose from "mongoose";

const demandeSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    detailsVehicule: {
      // Spécifiez les détails du véhicule ici
      type: String,
      required: true,
    },
    localisationActuelle: {
      // Spécifiez la localisation actuelle ici
      type: String,
      required: true,
    },
    destinationFinale: {
      // Spécifiez la destination finale ici
      type: String,
      required: true,
    },
    statut: {
      // Spécifiez le statut ici
      type: String,
      enum: ["en attente", "rejetée", "en cours de traitement", "finalisée"],
      default: "en attente",
    },
    idDevis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devis",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Demande", demandeSchema);
