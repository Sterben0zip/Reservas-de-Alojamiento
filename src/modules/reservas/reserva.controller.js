import { reservaService } from "./reserva.service.js";
import { validarCrearReserva, validarIdReserva, validarEditarReserva, errorFlattenError } from "./reserva.schema.js";

export class reservaController {

  crear = async (req, res, next) => {
    try {
      const result = validarCrearReserva(req.body);
      if (!result.success)
        return res.status(400).json({ status: "error", error: errorFlattenError(result.error) });

      const data = result.data;
      const nueva = await reservaService.crear(data);

      res.status(201).json({ status: "success", reserva: nueva });

    } catch (error) {
      next(error);
    }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await reservaService.consultar();
      res.status(200).json({ status: "success", reservas: lista });

    } catch (error) {
      next(error);
    }
  };

  consultarPorId = async (req, res, next) => {
    try {
      const result = validarIdReserva(req.params);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reserva = await reservaService.consultarPorId(result.data);
      res.status(200).json({ status: "success", reserva });

    } catch (error) {
      next(error);
    }
  };

  editar = async (req, res, next) => {
    try {
      const result = validarEditarReserva(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const reserva = await reservaService.actualizarFechas(result.data);
      res.status(200).json({ status: "success", reserva });

    } catch (error) {
      next(error);
    }
  };

  eliminar = async (req, res, next) => {
    try {
      const result = validarIdReserva(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const r = await reservaService.eliminar(result.data);
      res.status(200).json({ status: "success", reserva: r });

    } catch (error) {
      next(error);
    }
  };
}