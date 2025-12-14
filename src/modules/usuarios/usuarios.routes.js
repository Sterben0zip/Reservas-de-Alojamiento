import { Router } from "express"
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js"
import { usuariosController } from "./usuarios.controller.js"

export const usuariosRouter = () => {
  const router = Router();
  const controller = new usuariosController();

  router.post("/", controller.crear);
  router.get("/", controller.consultar);
  router.get("/:id", controller.consultarPorId);
  router.put("/", authCookieMiddleware, controller.editar);
  router.delete("/", authCookieMiddleware, controller.eliminar);

  return router;
};