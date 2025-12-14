import { reseService } from "./rese.service.js"
import {
  validarCrearRese,
  validarEditarRese,
  validarIdRese,
  errorFlattenError
} from "./rese.schema.js"

export class reseController {

  crear = async (req, res, next) => {
    try {
      const result = validarCrearRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const data = result.data;
      const nueva = await reseService.crear(data);

      res.status(201).json({ status: "success", rese: nueva });

    } catch (error) { next(error); }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await reseService.consultar();
      res.status(200).json({ status: "success", reseñas: lista });

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
      const result = validarEditarRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const r = await reseService.editar(result.data);
      res.status(200).json({ status: "success", reseña: r });

    } catch (error) { next(error); }
  };

  eliminar = async (req, res, next) => {
    try {
      const result = validarIdRese(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const r = await reseService.eliminar(result.data);
      res.status(200).json({ status: "success", reseña: r });

    } catch (error) { next(error); }
  };
}