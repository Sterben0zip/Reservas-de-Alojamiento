import { getConnection } from "../../config/database.js";
import { QueryError } from "../../core/errors/connection.error.js";
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";
import crypto from "crypto";

export class usuariosModel {

  static async crear({ usuario, correo, password, nombre, id_rol, status = 1 }) {
    const conn = await getConnection();

    try {
      const id = crypto.randomUUID();

      await conn.query(
        `INSERT INTO usuarios (id, usuario, correo, password, nombre, status, id_rol)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidToBuffer(id),
          usuario,
          correo,
          password,
          nombre,
          status,
          id_rol
        ]
      );

      return { id, usuario, correo, nombre, status, id_rol };

    } catch (error) {
      throw new QueryError("Error al crear usuario", 502, error);
    }
  }

  static async consultar() {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(`
        SELECT id, usuario, correo, nombre, status, id_rol
        FROM usuarios
        ORDER BY id DESC
      `);

      return rows.map(u => ({
        ...u,
        id: bufferToUuid(u.id)
      }));

    } catch (error) {
      throw new QueryError("Error al consultar usuarios", 502, error);
    }
  }

  static async consultarPorCorreo({ correo }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(
        `SELECT id, usuario, correo, password, nombre, status, id_rol
         FROM usuarios
         WHERE correo = ?`,
        [correo]
      );

      if (rows.length === 0) return null;

      const u = rows[0];
      return {
        ...u,
        id: bufferToUuid(u.id)
      };

    } catch (error) {
      throw new QueryError("Error al buscar usuario por correo", 502, error);
    }
  }

  static async consultarPorid({ id }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(
        `SELECT id, usuario, correo, nombre, status, id_rol
         FROM usuarios
         WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      if (rows.length === 0) return null;

      const u = rows[0];
      return {
        ...u,
        id: bufferToUuid(u.id)
      };

    } catch (error) {
      throw new QueryError("Error al buscar usuario por id", 502, error);
    }
  }

  static async actualizar({ id, nombre, status }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `UPDATE usuarios
         SET nombre = ?, status = ?
         WHERE id = ?`,
        [nombre, status, uuidToBuffer(id)]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al actualizar usuario", 502, error);
    }
  }

  static async eliminar({ id }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `DELETE FROM usuarios WHERE id = ?`,
        [uuidToBuffer(id)]
      );

      return result.affectedRows > 0;

    } catch (error) {
      throw new QueryError("Error al eliminar usuario", 502, error);
    }
  }
}