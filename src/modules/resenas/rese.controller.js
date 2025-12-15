import { reseService } from "./rese.service.js"
import {
  validarCrearRese,
  validarEditarRese,
  validarIdRese,
  errorFlattenError
} from "./rese.schema.js"
import {uuidToBuffer} from "../../core/utils/uuid.js";

export class reseController {

  crear = async (req, res, next) => {
    try {
      const { id, rol } = req.usuario;

      if (rol !== "CLIENTE")
        return res.status(403).json({ error: "Solo los clientes pueden crear resenas" });

      const result = validarCrearRese({
        ...req.body,
        id_usuario: id
      });

      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const nueva = await reseService.crear(result.data);

      res.status(201).json({ status: "success", reseña: nueva });

    } catch (error) { next(error); }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await reseService.consultar();
      res.status(200).json({ status: "success", resenas: lista });

    } catch (error) { next(error); }
  };

  consultarPorId = async (req, res, next) => {
    try {
      const result = validarIdRese(req.params);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const r = await reseService.consultarPorId(result.data);
      res.status(200).json({ status: "success", reseña: r });

    } catch (error) { next(error); }
  };

  editar = async (req, res, next) => {
    try {
      const { id: usuarioId, rol } = req.usuario;

      const result = validarEditarRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reseña = await reseService.consultarPorId({ id: result.data.id });

      if (rol !== "ADMIN" && reseña.id_usuario !== usuarioId)
        return res.status(403).json({ error: "No tienes permiso para editar esta reseña" });

      const r = await reseService.editar(result.data);
      res.status(200).json({ status: "success", reseña: r });

    } catch (error) { next(error); }
  };

  eliminar = async (req, res, next) => {
    try {
      const { id: usuarioId, rol } = req.usuario;

      const result = validarIdRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reseña = await reseService.consultarPorId(result.data);

      if (rol !== "ADMIN" && reseña.id_usuario !== usuarioId)
        return res.status(403).json({ error: "No tienes permiso para eliminar esta reseña" });

      const r = await reseService.eliminar(result.data);
      res.status(200).json({ status: "success", reseña: r });

    } catch (error) { next(error); }
  };
}