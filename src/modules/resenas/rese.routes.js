import { Router } from "express"
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js"
import { reseController } from "./rese.controller.js"

export const reseRouter = () => {
  const router = Router();
  const controller = new reseController();

  router.post("/crear", authCookieMiddleware, controller.crear);
  router.get("/consulta", controller.consultar);
  router.get("/consulta:id", controller.consultarPorId);
  router.put("/editar", authCookieMiddleware, controller.editar);
  router.delete("/drop:id", authCookieMiddleware, controller.eliminar);

  return router;
};