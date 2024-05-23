import Annonce from "../models/Annonce.js";

// Créer une nouvelle annonce
const createAnnonce = async (req, res) => {
  try {
    const { idUser } = req.headers;
    const {
      prixVehicule,
      anneeVehicule: annee,
      marqueVehicule: marque,
      modeleVehicule: modele,
      placesVehicule: places,
      transmissionVehicule: transmission,
      description,
      photos,
      TVM,
      carteGrise,
      contratAssurance,
      visiteTechnique,
    } = req.body;
    const regularisation = Object.keys(req.body).includes("regularisation");
    console.log("BBB", req.body);
    // Vérifier si les champs requis sont fournis
    if (
      !idUser ||
      !prixVehicule ||
      !description ||
      !photos ||
      !transmission ||
      !TVM ||
      !modele
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const nouvelleAnnonce = new Annonce({
      idUser,
      detailsVehicule: {
        annee,
        marque,
        modele,
        transmission,
        places,
        photos,
        pieces: {
          TVM,
          carteGrise,
          contratAssurance,
          visiteTechnique,
        },
      },
      prixVehicule,
      regularisation,
      description,
    });
    const annonceEnregistree = await nouvelleAnnonce.save();
    res.status(201).json(annonceEnregistree);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les annonces
const getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une annonce par ID
const getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id).populate("user");
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une annonce
const updateAnnonce = async (req, res) => {
  try {
    const { idUser, detailsVehicule, prixVehicule, etatRegularisation } =
      req.body;

    // Vérifier si les champs requis sont fournis
    if (!idUser || !detailsVehicule || !prixVehicule || !etatRegularisation) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une annonce
const deleteAnnonce = async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
};
