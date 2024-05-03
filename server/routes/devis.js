import express from "express";
import {
  createDevis,
  getDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
} from "../controllers/DevisController.js";

const router = express.Router();

/* GET users listing. */
router.get("/", getDevis);
router.get("/:id", getDevisById);
router.post("/", createDevis);
router.patch("/:id", updateDevis);
router.delete("/:id", deleteDevis);

export default router;
