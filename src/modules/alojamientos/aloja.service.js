import { alojaModel } from "./aloja.model.js";
import { alojaError } from "./aloja.error.js";

export class alojaService {

  static async crear(data) {
    const nuevo = await alojaModel.insertar(data);
    return nuevo;
  }

  static async consultar() {
    return await alojaModel.consultar();
  }

  static async consultarPorId({ id }) {
    const res = await alojaModel.consultarPorId({ id });
    if (!res) throw new alojaError("Alojamiento no encontrado", 404);
    return res;
  }

  static async editar(data) {
    const ok = await alojaModel.actualizar(data);
    if (!ok) throw new alojaError("No se pudo actualizar el alojamiento", 400);
    return this.consultarPorId({ id: data.id });
  }

  static async eliminar({ id }) {
    const ok = await alojaModel.eliminar({ id });
    if (!ok) throw new alojaError("No existe el alojamiento", 404);
    return { id, message: "Alojamiento eliminado correctamente" };
  }
}