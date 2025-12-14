import { Router } from "express";
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js";
import { reservaController } from "./reserva.controller.js";

export const reservaRouter = () => {
  const router = Router();
  const controller = new reservaController();

  router.post("/", authCookieMiddleware, controller.crear);
  router.get("/", controller.consultar);
  router.get("/:id", controller.consultarPorId);
  router.put("/", authCookieMiddleware, controller.editar);
  router.delete("/", authCookieMiddleware, controller.eliminar);

  return router;
};
