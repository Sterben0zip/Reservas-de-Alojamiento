import { Router } from "express"
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js"
import { reseController } from "./rese.controller.js"
import { ROLES } from "../../core/roles/roles.js";
import { requireRole } from "../../core/middlewares/roles.middleware.js";

export const reseRouter = () => {
  const router = Router();
  const controller = new reseController();

  router.post("/crear", authCookieMiddleware, requireRole([ROLES.USER]), controller.crear);
  router.get("/consulta", authCookieMiddleware, controller.consultar);
  router.get("/consulta:id", authCookieMiddleware, controller.consultarPorId);
  router.put("/editar", authCookieMiddleware, requireRole([ROLES.USER]), controller.editar);
  router.delete("/drop", authCookieMiddleware, requireRole([ROLES.USER, ROLES.ADMIN]), controller.eliminar);

  return router;
};