import { getConnection } from "../../config/database.js";
import { QueryError } from "../../core/errors/connection.error.js";
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";
import crypto from "crypto";

export class reservaModel {

  static async crear({ id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total }) {
    const conn = await getConnection();

    try {
      const id = crypto.randomUUID();

      await conn.query(
        `INSERT INTO reservas (id, id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total, cantidad_huespedes, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuidToBuffer(id),
          uuidToBuffer(id_usuario),
          uuidToBuffer(id_aloja),
          fecha_inicio,
          fecha_fin,
          precio_total,
          cantidad_huespedes,
          creado_en,
          actualizado_en
        ]
      );

      return { id, id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total, cantidad_huespedes, creado_en, actualizado_en };

    } catch (error) {
      throw new QueryError("Error al crear la reserva", 502, error);
    }
  }

  static async consultar() {
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(`
        SELECT 
          id, id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total
        FROM reservas
        ORDER BY creado_en DESC
      `);

      return rows.map(r => ({
        ...r,
        id: bufferToUuid(r.id),
        id_usuario: bufferToUuid(r.id_usuario),
        id_aloja: bufferToUuid(r.id_aloja)
      }));

    } catch (error) {
      throw new QueryError("Error al obtener reservas", 502, error);
    }
  }

  static async consultarPorid({ id }) {
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT id, id_usuario, id_aloja, fecha_inicio, fecha_fin, precio_total
         FROM reservas WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      if (rows.length === 0) return null;

      const r = rows[0];
      return {
        ...r,
        id: bufferToUuid(r.id),
        id_usuario: bufferToUuid(r.id_usuario),
        id_aloja: bufferToUuid(r.id_aloja)
      };

    } catch (error) {
      throw new QueryError("Error al obtener una reserva por id", 502, error);
    }
  }

  static async choquefechas({ id_aloja, inicio, fin }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(
        `SELECT COUNT(*) AS choques
         FROM reservas
         WHERE id_aloja = ?
         AND (
            (fecha_inicio <= ? AND fecha_fin >= ?) OR
            (fecha_inicio <= ? AND fecha_fin >= ?)
         )`,
        [
          uuidToBuffer(id_aloja),
          inicio, inicio,
          fin, fin
        ]
      );

      return rows[0].choques > 0;

    } catch (error) {
      throw new QueryError("Error al validar fechas", 502, error);
    }
  }

  static async actualizar({ id, status, fecha_inicio, fecha_fin }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `UPDATE reservas
         SET status=?, fecha_inicio = ?, fecha_fin = ?
         WHERE id = ?`,
        [status, fecha_inicio, fecha_fin, uuidToBuffer(id)]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al actualizar fechas de reserva", 502, error);
    }
  }

  static async eliminar({ id }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `DELETE FROM reservas WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al eliminar reserva", 502, error);
    }
  }
}