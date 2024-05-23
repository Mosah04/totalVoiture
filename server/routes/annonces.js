import express from "express";
import {
  createAnnonce,
  getAnnonces,
  getAnnonceById,
  updateAnnonce,
  deleteAnnonce,
} from "../controllers/AnnonceController.js";
import middleware, { manageAnnonceFiles } from "../middleware/index.js";

const router = express.Router();

router.get("/", getAnnonces);
router.get("/:id", getAnnonceById);
router.post(
  "/",
  middleware.decodeToken,
  manageAnnonceFiles()[0],
  manageAnnonceFiles()[1],
  createAnnonce
);
router.patch("/:id", middleware.decodeToken, updateAnnonce);
router.delete("/:id", middleware.decodeToken, deleteAnnonce);

export default router;
