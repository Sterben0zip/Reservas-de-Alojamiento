import {
  validarCrearUsuario,
  validarEditarUsuario,
  validarIdUsuario,
  errorFlattenError
} from "./usuarios.schema.js"
import { usuariosService } from "./usuarios.service.js"

export class usuariosController {

  crear = async (req, res, next) => {
    try {
      const result = validarCrearUsuario(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const nuevo = await usuariosService.registrar(result.data);
      res.status(201).json({ status: "success", usuario: nuevo });

    } catch (error) { next(error); }
  };

  consultar = async (req, res, next) => {
    try {
      const lista = await usuariosService.consultar();
      res.status(200).json({ status: "success", usuarios: lista });

    } catch (error) { next(error); }
  };

  consultarPorid = async (req, res, next) => {
    try {
      const result = validarIdUsuario(req.params);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const u = await usuariosService.consultarPorId(result.data);
      res.status(200).json({ status: "success", usuario: u });

    } catch (error) { next(error); }
  };

  consultarPorCorreo = async (req, res, next) => {
  try {
    const { correo } = req.params;
    const u = await usuariosService.consultarPorcorreo({ correo });
    res.status(200).json({ status: "success", usuario: u });
  } catch (error) {
    next(error);
  }
  };

  editar = async (req, res, next) => {
    try {
      const result = validarEditarUsuario(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const u = await usuariosService.editar(result.data);
      res.status(200).json({ status: "success", usuario: u });

    } catch (error) { next(error); }
  };

  eliminar = async (req, res, next) => {
    try {
      const result = validarIdUsuario(req.body);
      if (!result.success)
        return res.status(400).json({ error: errorFlattenError(result.error) });

      const r = await usuariosService.eliminar(result.data);
      res.status(200).json({ status: "success", usuario: r });

    } catch (error) { next(error); }
  };
}