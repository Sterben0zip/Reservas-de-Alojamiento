import { Router } from "express";
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js";
import { alojaController } from "./aloja.controller.js";
import { ROLES } from "../../core/roles/roles.js";
import { requireRole } from "../../core/middlewares/roles.middleware.js";

export const alojamientosRouter = () => {
  const router = Router();
  const controller = new alojaController();

  router.post("/crear", authCookieMiddleware, requireRole([ROLES.HOST]), controller.crear);
  router.get("/consulta", authCookieMiddleware, requireRole([ROLES.HOST, ROLES.ADMIN]), controller.consultar);
  router.get("/consulta:id", authCookieMiddleware, requireRole([ROLES.HOST]), controller.consultarPorId);
  router.put("/editar", authCookieMiddleware, requireRole([ROLES.HOST]), controller.editar);
  router.delete("/drop:id", authCookieMiddleware, requireRole([ROLES.HOST]), controller.eliminar);

  return router;
};