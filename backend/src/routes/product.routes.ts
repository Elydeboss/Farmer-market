// src/routes/product.routes.ts
import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  toggleAvailability,
} from "../controllers/product.controller";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateQueryProducts,
} from "../middlewares/product.validation";
import { ensureVerifiedFarmer } from "../middlewares/ensureVerifiedFarmer";

const router = Router();

// public
router.get("/", validateQueryProducts, getProducts);

// verified farmer only
router.post("/", authMiddleware, authorizeRoles("farmer"), ensureVerifiedFarmer, validateCreateProduct, createProduct);
router.patch("/:id", authMiddleware, authorizeRoles("farmer"), ensureVerifiedFarmer, validateUpdateProduct, updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles("farmer"), ensureVerifiedFarmer, deleteProduct);
router.patch("/:id/toggle-availability", authMiddleware, authorizeRoles("farmer"), ensureVerifiedFarmer, toggleAvailability);

export default router;
