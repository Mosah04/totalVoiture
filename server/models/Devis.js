import mongoose from "mongoose";

const { Schema, model } = mongoose;

const devisSchema = new Schema(
  {
    idDemande: {
      type: Schema.Types.ObjectId,
      ref: "Demande", // Référence au modèle Demande
      required: true,
    },
    idTransitaire: {
      type: String,
      required: true,
    },
    cout: {
      type: Number,
      required: true,
    },
    delai: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
    },
    statut: {
      type: String,
      enum: ["acceptée", "en attente", "refusée"],
      default: "en attente",
    },
  },
  {
    timestamps: true, // Active la gestion automatique des timestamps
  }
);

export default model("Devis", devisSchema);
