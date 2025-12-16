import { reservaModel } from "./reserva.model.js";
import { reservaError } from "./reserva.error.js";
import { alojaModel } from "../alojamientos/aloja.model.js";


export class reservaService {

static async crear({id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total, cantidad_huespedes
}) {

  const choque = await reservaModel.choquefechas({
    id_aloja,
    inicio: fecha_inicio,
    fin: fecha_fin
  });

  if (choque) {
    throw new reservaError(
      "El alojamiento ya está ocupado en esas fechas",
      400
    );
  }

  const alojamiento = await alojaModel.buscarPorId({ id: id_aloja });

  if (!alojamiento) {
    throw new reservaError("El alojamiento no existe", 404);
  }

  if (cantidad_huespedes > alojamiento.capacidad) {
    throw new reservaError(
      `Máximo ${alojamiento.capacidad} huéspedes permitidos`,
      400
    );
  }

  const nueva = await reservaModel.crear({
    id_usuario,
    id_aloja,
    fecha_inicio,
    fecha_fin,
    precio_total,
    cantidad_huespedes
  });

  return nueva;
}

  static async consultar() {
    return await reservaModel.consultar();
  }

  static async consultarPorId({ id }) {
    const r = await reservaModel.consultarPorid({ id });
    if (!r) throw new reservaError("Reserva no encontrada", 404);
    return r;
  }

  static async actualizarFechas({ id, fecha_inicio, fecha_fin }) {
    const ok = await reservaModel.actualizar({ id, fecha_inicio, fecha_fin });
    if (!ok) throw new reservaError("No se pudo actualizar la reserva", 400);
    return this.consultarPorId({ id });
  }

  static async eliminar({ id }) {
    const ok = await reservaModel.eliminar({ id });
    if (!ok) throw new reservaError("No existe la reserva", 404);
    return { id, message: "Reserva eliminada" };
  }
}