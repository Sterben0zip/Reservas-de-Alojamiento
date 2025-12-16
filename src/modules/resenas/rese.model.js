import { getConnection } from "../../config/database.js"
import { QueryError } from "../../core/errors/connection.error.js"
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js"
import crypto from "crypto"

export class reseModel {

  static async crear({ id_usuario, id_aloja, rating, comentario }) {
    const conn = await getConnection();
    try {
      const id = crypto.randomUUID();

      await conn.query(
        `INSERT INTO rese (id, id_usuario, id_aloja, rating, comentario)
         VALUES (?, ?, ?, ?, ?)`,
        [
          uuidToBuffer(id),
          uuidToBuffer(id_usuario),
          uuidToBuffer(id_aloja),
          rating,
          comentario
        ]
      );

      return { id, id_usuario, id_aloja, rating, comentario };

    } catch (error) {
      throw new QueryError("Error al insertar reseña", 502, error);
    }
  }

  static async consultar() {
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(`
        SELECT id, id_usuario, id_aloja, rating, comentario, creado_en, actualizado_en
        FROM rese ORDER BY creado_en DESC
      `);

      return rows.map(r => ({
        ...r,
        id: bufferToUuid(r.id),
        id_usuario: bufferToUuid(r.id_usuario),
        id_aloja: bufferToUuid(r.id_aloja)
      }));

    } catch (error) {
      throw new QueryError("Error al obtener resenas", 502, error);
    }
  }

  static async consultarPorId({ id }) {
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT id, id_usuario, id_aloja, rating, comentario, creado_en
         FROM rese WHERE id = ?`,
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
      throw new QueryError("Error al obtener reseña por id", 502, error);
    }
  }

  static async actualizar({ id, rating, comentario }) {
    const conn = await getConnection();
    try {
      const [res] = await conn.query(
        `UPDATE rese SET rating = ?, comentario = ?
         WHERE id = ?`,
        [rating, comentario, uuidToBuffer(id)]
      );

      return res.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al actualizar reseña", 502, error);
    }
  }

  static async eliminar({ id }) {
    const conn = await getConnection();
    try {
      const [res] = await conn.query(
        `DELETE FROM rese WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      return res.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al eliminar reseña", 502, error);
    }
  }
}