import mongoose from "mongoose";

const { Schema, model } = mongoose;

const detailsVehiculeSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  annee: Number,
  photos: [String],
});

const annonceSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    detailsVehicule: {
      type: detailsVehiculeSchema,
      required: true,
    },
    prixVehicule: {
      type: Number,
      required: true,
    },
    etatRegularisation: {
      type: String,
      required: true,
    },
    datePublication: {
      type: Date,
      required: false,
    },
    validationAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Annonce", annonceSchema);
