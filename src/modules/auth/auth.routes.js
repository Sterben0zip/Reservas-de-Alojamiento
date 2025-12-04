import { Router } from "express";
import { verificarToken } from "../../core/middlewares/auth.middleware.js";
import { requireRole } from "../../core/middlewares/roles.middleware.js";
import { ROLES } from "../../core/roles/roles.js";

export const alojamientoRouter = () => {
  const router = Router();

  // Solo HOST puede crear alojamientos
  router.post(
    "/",
    verificarToken,
    requireRole([ROLES.HOST]),
    crearAlojamiento
  );

  // Solo USER puede reservar
  router.post(
    "/:id/reservar",
    verificarToken,
    requireRole([ROLES.USER]),
    crearReserva
  );

  // Solo ADMIN puede borrar lo que quiera
  router.delete(
    "/:id",
    verificarToken,
    requireRole([ROLES.ADMIN]),
    eliminarAlojamiento
  );

  return router;
};
