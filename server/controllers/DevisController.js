import Devis from "../models/Devis.js";

const createDevis = async (req, res) => {
  try {
    const nouveauDevis = new Devis(req.body);
    const devisEnregistre = await nouveauDevis.save();
    res.status(201).json(devisEnregistre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDevis = async (req, res) => {
  try {
    const devis = await Devis.find();
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDevisById = async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ message: "Devis non trouvé" });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDevis = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!devis) {
      return res.status(404).json({ message: "Devis non trouvé" });
    }
    res.status(200).json(devis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDevis = async (req, res) => {
  try {
    const devis = await Devis.findByIdAndDelete(req.params.id);
    if (!devis) {
      return res.status(404).json({ message: "Devis non trouvé" });
    }
    res.status(200).json({ message: "Devis supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createDevis, getDevis, getDevisById, updateDevis, deleteDevis };
