import { Router } from "express"
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js"
import { reseController } from "./rese.controller.js"

export const reseRouter = () => {
  const router = Router();
  const controller = new reseController();

  router.post("/", authCookieMiddleware, controller.crear);
  router.get("/", controller.consultar);
  router.get("/:id", controller.consultarPorId);
  router.put("/", authCookieMiddleware, controller.editar);
  router.delete("/", authCookieMiddleware, controller.eliminar);

  return router;
};
