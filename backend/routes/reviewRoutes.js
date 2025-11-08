import express from "express";
import {
  crearReview,
  obtenerReviews,
  obtenerReviewsAdmin,
  cambiarVisibilidad,
  eliminarReview
} from "../controllers/reviewController.js";

const router = express.Router();

// 🔹 Obtener solo reviews visibles (público)
router.get("/", obtenerReviews);

// 🔹 Obtener todas las reviews (antes admin, ahora público)
router.get("/admin", obtenerReviewsAdmin);

// 🔹 Crear una nueva review
router.post("/", crearReview);

// 🔹 Cambiar visibilidad de una review
router.put("/visibilidad", cambiarVisibilidad);

// 🔹 Eliminar una review por ID
router.delete("/:id", eliminarReview);

export default router;
