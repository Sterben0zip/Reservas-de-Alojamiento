import { reseService } from "./rese.service.js";
import {
  validarCrearRese,
  validarEditarRese,
  validarIdRese,
  errorFlattenError
} from "./rese.schema.js";

export class reseController {

  crear = async (req, res, next) => {
    try {
      const { id } = req.user; 

      const result = validarCrearRese({
        ...req.body,
        id_usuario: id
      });

      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const nueva = await reseService.crear(result.data);
      res.status(201).json({ status: "success", reseña: nueva });

    } catch (error) {
      next(error);
    }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await reseService.consultar();
      res.status(200).json({ status: "success", resenas: lista });

    } catch (error) {
      next(error);
    }
  };

  consultarPorId = async (req, res, next) => {
    try {
      const result = validarIdRese(req.params);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reseña = await reseService.consultarPorId(result.data);
      res.status(200).json({ status: "success", reseña });

    } catch (error) {
      next(error);
    }
  };

  editar = async (req, res, next) => {
    try {
      const result = validarEditarRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reseña = await reseService.editar(result.data);
      res.status(200).json({ status: "success", reseña });

    } catch (error) {
      next(error);
    }
  };

  
  eliminar = async (req, res, next) => {
  const data = req.body?.id ? req.body : req.query;
  try {
    const result = validarIdRese(data);
    if (!result.success)
      return res.status(400).json({ error: errorFlattenError(result.error) });

    const respuesta = await reseService.eliminar(result.data);

    res.status(200).json({ status: "success", ...respuesta });

  } catch (error) {
    next(error);
  }
  };
}