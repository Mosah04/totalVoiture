import express from "express";
import {
  createAssurance,
  getAssurances,
  getAssuranceById,
  updateAssurance,
  deleteAssurance,
} from "../controllers/AssuranceController.js";

const router = express.Router();

router.get("/", getAssurances);
router.get("/:id", getAssuranceById);
router.post("/", createAssurance);
router.patch("/:id", updateAssurance);
router.delete("/:id", deleteAssurance);

export default router;
