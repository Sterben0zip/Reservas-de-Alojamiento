import { Router } from "express";
import { verificarToken } from "../../core/middlewares/auth.middleware.js";
import { requireRole } from "../../core/middlewares/roles.middleware.js";
import { ROLES } from "../../core/roles/roles.js";

// Controladores (asegúrate de importar los correctos)
import { crearAlojamiento, eliminarAlojamiento } from "./alojamientos.controller.js";
import { crearReserva } from "../reservas/reservas.controller.js";

export const alojamientosRouter = () => {
  const router = Router();

  // HOST crea alojamientos
  router.post(
    "/",
    verificarToken,
    requireRole([ROLES.HOST]),
    crearAlojamiento
  );

  // USER reserva un alojamiento
  router.post(
    "/:id/reservar",
    verificarToken,
    requireRole([ROLES.USER]),
    crearReserva
  );

  // ADMIN elimina alojamientos
  router.delete(
    "/:id",
    verificarToken,
    requireRole([ROLES.ADMIN]),
    eliminarAlojamiento
  );

  return router;
};
