import express from "express";
import {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
} from "../controllers/AnnonceController.js";

const router = express.Router();

router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);
router.post("/", createAnnonce);
router.patch("/:id", updateAnnonce);
router.delete("/:id", deleteAnnonce);

export default router;
