import { reservaModel } from "./reserva.model.js";
import { reservaError } from "./reserva.error.js";

export class reservaService {

  static async crear({ id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total }) {

    const choque = await reservaModel.choquefechas({
      id_aloja,
      inicio: fecha_inicio,
      fin: fecha_fin
    });

    if (choque) {
      throw new reservaError("El alojamiento ya está ocupado en esas fechas", 400);
    }

    const nueva = await reservaModel.crear({
      id_usuario,
      id_aloja,
      fecha_inicio,
      fecha_fin,
      precio_total
    });

    return nueva;
  }

  static async consultar() {
    return await reservaModel.obtenerTodas();
  }

  static async consultarPorId({ id }) {
    const r = await reservaModel.obtenerPorId({ id });
    if (!r) throw new reservaError("Reserva no encontrada", 404);
    return r;
  }

  static async editarFechas({ id, fecha_inicio, fecha_fin }) {
    const ok = await reservaModel.actualizarFechas({ id, fecha_inicio, fecha_fin });
    if (!ok) throw new reservaError("No se pudo actualizar la reserva", 400);
    return this.consultarPorId({ id });
  }

  static async eliminar({ id }) {
    const ok = await reservaModel.eliminar({ id });
    if (!ok) throw new reservaError("No existe la reserva", 404);
    return { id, message: "Reserva eliminada" };
  }
}