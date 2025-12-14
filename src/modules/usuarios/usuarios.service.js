import { usuariosModel } from "./usuarios.model.js"
import { usuariosError } from "./usuarios.error.js"

export class usuariosService {

  static async registrar({ nombre, correo, contrasena, rol }) {
    const existe = await usuariosModel.buscarPorCorreo({ correo });

    if (existe) {
      throw new usuariosError("El correo ya está registrado", 400);
    }

    const nuevo = await usuariosModel.insertarUsuario({
      nombre,
      correo,
      contrasena,
      rol
    });

    return nuevo;
  }

  static async consultar() {
    return await usuariosModel.buscarTodos();
  }

  static async consultarPorId({ id }) {
    const user = await usuariosModel.buscarPorId({ id });

    if (!user) throw new usuariosError("Usuario no encontrado", 404);

    return user;
  }

  static async editar({ id, nombre }) {
    const ok = await usuariosModel.actualizar({ id, nombre });

    if (!ok) throw new usuariosError("No se pudo actualizar el usuario", 400);

    return this.consultarPorId({ id });
  }

  static async eliminar({ id }) {
    const ok = await usuariosModel.eliminar({ id });

    if (!ok) throw new usuariosError("No existe el usuario", 404);

    return { id, message: "Usuario eliminado correctamente" };
  }
}