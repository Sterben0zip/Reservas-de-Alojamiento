import {
  validarCrearAloja,
  validarEditarAloja,
  validarIdAloja,
  errorFlattenError
} from "./aloja.schema.js";

import { alojaService } from "./aloja.service.js";

export class alojaController {

  crear = async (req, res, next) => {
    try {
      const result = validarCrearAloja(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const nuevo = await alojaService.crear(result.data);
      res.status(201).json({ status: "success", alojamiento: nuevo });
  
    } catch (error) { next(error); }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await alojaService.consultar();
      res.status(200).json({ status: "success", alojamientos: lista });

    } catch (error) { next(error); }
  };

  consultarPorId = async (req, res, next) => {
    try {
      const result = validarIdAloja(req.params);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const aloja = await alojaService.consultarPorId(result.data);
      res.status(200).json({ status: "success", alojamiento: aloja });

    } catch (error) { next(error); }
  };

  editar = async (req, res, next) => {
    try {
      const result = validarEditarAloja(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const aloja = await alojaService.editar(result.data);
      res.status(200).json({ status: "success", alojamiento: aloja });

    } catch (error) { next(error); }
  };

  eliminar = async (req, res, next) => {
    try {
      const result = validarIdAloja(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const aloja = await alojaService.eliminar(result.data);
      res.status(200).json({ status: "success", alojamiento: aloja });

    } catch (error) { next(error); }
  };
}