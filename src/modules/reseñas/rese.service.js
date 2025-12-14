import { reseModel } from "./rese.model.js"
import { reseError } from "./rese.error.js"

export class reseService {

  static async crear({ id_usuario, id_aloja, rating, comentario }) {
    const nueva = await reseModel.insertar({
      id_usuario,
      id_aloja,
      rating,
      comentario
    });

    return nueva;
  }

  static async consultar() {
    return await reseModel.obtenerTodas();
  }

  static async consultarPorId({ id }) {
    const r = await reseModel.obtenerPorId({ id });

    if (!r) throw new reseError("Reseña no encontrada", 404);

    return r;
  }

  static async editar({ id, rating, comentario }) {
    const ok = await reseModel.actualizar({ id, rating, comentario });

    if (!ok) throw new reseError("No se pudo actualizar la reseña", 400);

    return this.consultarPorId({ id });
  }

  static async eliminar({ id }) {
    const ok = await reseModel.eliminar({ id });

    if (!ok) throw new reseError("No existe la reseña", 404);

    return { id, message: "Reseña eliminada" };
  }
}