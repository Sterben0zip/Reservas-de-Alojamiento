import { Router } from "express";
import { authCookieMiddleware } from "../../core/middlewares/authCookie.js";
import { alojaController } from "./aloja.controller.js";

export const alojamientosRouter = () => {
  const router = Router();
  const controller = new alojaController();

  router.post("/crear", authCookieMiddleware, controller.crear);
  router.get("/", controller.consultar);
  router.get("/:id", controller.consultarPorId);
  router.put("/", authCookieMiddleware, controller.editar);
  router.delete("/", authCookieMiddleware, controller.eliminar);

  return router;
};