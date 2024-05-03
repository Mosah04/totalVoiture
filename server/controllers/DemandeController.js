import Demande from "../models/Demande.js";

const createDemande = async (req, res) => {
  try {
    const nouvelleDemande = new Demande(req.body);
    const demandeEnregistree = await nouvelleDemande.save();
    res.status(201).json(demandeEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.status(200).json(demandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDemandeById = async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndDelete(req.params.id);
    if (!demande) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.status(200).json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createDemande,
  getDemandes,
  getDemandeById,
  updateDemande,
  deleteDemande,
};
