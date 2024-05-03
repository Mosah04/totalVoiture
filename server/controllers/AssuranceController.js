import Assurance from "../models/Assurance.js";

const createAssurance = async (req, res) => {
  try {
    const nouvelleAssurance = new Assurance(req.body);
    const assuranceEnregistree = await nouvelleAssurance.save();
    res.status(201).json(assuranceEnregistree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAssurances = async (req, res) => {
  try {
    const assurances = await Assurance.find();
    res.status(200).json(assurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssuranceById = async (req, res) => {
  try {
    const assurance = await Assurance.findById(req.params.id);
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json(assurance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAssurance = async (req, res) => {
  try {
    const assurance = await Assurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json(assurance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAssurance = async (req, res) => {
  try {
    const assurance = await Assurance.findByIdAndDelete(req.params.id);
    if (!assurance) {
      return res.status(404).json({ message: "Assurance non trouvée" });
    }
    res.status(200).json({ message: "Assurance supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAssurance,
  getAssurances,
  getAssuranceById,
  updateAssurance,
  deleteAssurance,
};
