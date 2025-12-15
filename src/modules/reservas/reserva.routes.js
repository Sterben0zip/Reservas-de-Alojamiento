import { Router } from "express";
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js";
import { reservaController } from "./reserva.controller.js";

export const reservaRouter = () => {
  const router = Router();
  const controller = new reservaController();

  router.post("/crear", authCookieMiddleware, controller.crear);
  router.get("/consulta", controller.consultar);
  router.get("/consulta:id", controller.consultarPorId);
  router.put("/editar", authCookieMiddleware, controller.editar);
  router.delete("/drop", authCookieMiddleware, controller.eliminar);

  return router;
};
