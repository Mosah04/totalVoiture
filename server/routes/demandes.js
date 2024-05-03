import express from "express";
import {
  createDemande,
  getDemandes,
  getDemandeById,
  updateDemande,
  deleteDemande,
} from "../controllers/DemandeController.js";

const router = express.Router();

router.get("/", getDemandes);
router.get("/:id", getDemandeById);
router.post("/", createDemande);
router.patch("/:id", updateDemande);
router.delete("/:id", deleteDemande);

export default router;
