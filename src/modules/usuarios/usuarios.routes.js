import { Router } from "express"
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js"
import { usuariosController } from "./usuarios.controller.js"
import { requireRole } from "../../core/middlewares/roles.middleware.js";
import { ROLES } from "../../core/roles/roles.js";

export const usuariosRouter = () => {
  const router = Router();
  const controller = new usuariosController();

  router.get("/consultar", authCookieMiddleware, requireRole([ROLES.ADMIN]), controller.consultar);
  router.get("/consultar:id", authCookieMiddleware,requireRole([ROLES.ADMIN]), controller.consultarPorid);
  router.get("/correo:correo", authCookieMiddleware, requireRole([ROLES.ADMIN, ROLES.USER]), controller.consultarPorCorreo);
  router.put("/editar", authCookieMiddleware,requireRole([ROLES.ADMIN, ROLES.USER]), controller.editar);
  router.delete("/eliminar", authCookieMiddleware, requireRole([ROLES.ADMIN]), controller.eliminar);

  return router;
};