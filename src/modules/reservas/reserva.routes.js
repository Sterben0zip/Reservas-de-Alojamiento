import { Router } from "express";
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js";
import { reservaController } from "./reserva.controller.js";
import { ROLES } from "../../core/roles/roles.js";
import { requireRole } from "../../core/middlewares/roles.middleware.js";

export const reservaRouter = () => {
  const router = Router();
  const controller = new reservaController();

  router.post("/crear", authCookieMiddleware, requireRole([ROLES.USER]), controller.crear);
  router.get("/consulta", authCookieMiddleware,requireRole([ROLES.USER, ROLES.ADMIN]), controller.consultar);
  router.get("/consulta:id", authCookieMiddleware,requireRole([ROLES.USER, ROLES.ADMIN]), controller.consultarPorId);
  router.put("/editar", authCookieMiddleware, requireRole([ROLES.USER, ROLES.ADMIN]), controller.editar);
  router.delete("/drop", authCookieMiddleware, requireRole([ROLES.USER, ROLES.ADMIN]), controller.eliminar);

  return router;
};
