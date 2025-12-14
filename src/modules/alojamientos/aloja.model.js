import { getConnection } from "../../config/database.js";
import { QueryError } from "../../core/errors/connection.error.js";
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";
import crypto from "crypto";

export class alojaModel {

  static async insertar({ id_host, titulo, descripcion, precio, capacidad, ubicacion, servicios }) {
    const conn = await getConnection();

    try {
      const id = crypto.randomUUID();

      await conn.query(
        `INSERT INTO aloja (id, id_host, titulo, descripcion, precio, capacidad, ubicacion, servicios)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidToBuffer(id),
          uuidToBuffer(id_host),
          titulo,
          descripcion,
          precio,
          capacidad,
          ubicacion,
          JSON.stringify(servicios)
        ]
      );

      return { id, id_host, titulo, descripcion, precio, capacidad, ubicacion, servicios };

    } catch (error) {
      throw new QueryError("Error al crear alojamiento", 502, error);
    }
  }

  static async buscarTodos() {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(`
        SELECT id, id_host, titulo, descripcion, precio, capacidad, ubicacion, servicios
        FROM aloja
        ORDER BY creado_en DESC
      `);

      return rows.map(a => ({
        ...a,
        id: bufferToUuid(a.id),
        id_host: bufferToUuid(a.id_host),
        servicios: JSON.parse(a.servicios)
      }));

    } catch (error) {
      throw new QueryError("Error al obtener alojamientos", 502, error);
    }
  }

  static async buscarPorId({ id }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(
        `SELECT id, id_host, titulo, descripcion, precio, capacidad, ubicacion, servicios
         FROM aloja 
         WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      if (rows.length === 0) return null;

      const a = rows[0];

      return {
        ...a,
        id: bufferToUuid(a.id),
        id_host: bufferToUuid(a.id_host),
        servicios: JSON.parse(a.servicios)
      };

    } catch (error) {
      throw new QueryError("Error al buscar alojamiento por id", 502, error);
    }
  }

  static async actualizar({ id, titulo, descripcion, precio, capacidad, ubicacion, servicios }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `UPDATE aloja
         SET titulo = ?, descripcion = ?, precio = ?, capacidad = ?, ubicacion = ?, servicios = ?
         WHERE id = ?`,
        [
          titulo,
          descripcion,
          precio,
          capacidad,
          ubicacion,
          JSON.stringify(servicios),
          uuidToBuffer(id)
        ]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al actualizar alojamiento", 502, error);
    }
  }

  static async eliminar({ id }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `DELETE FROM aloja WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al eliminar alojamiento", 502, error);
    }
  }
}