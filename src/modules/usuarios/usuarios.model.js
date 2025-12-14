import { getConnection } from "../../config/database.js"
import { QueryError } from "../../core/errors/connection.error.js"
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js"
import crypto from "crypto"

export class usuariosModel {

  static async insertarUsuario({ nombre, correo, contrasena, rol }) {
    const conn = await getConnection();

    try {
      const id = crypto.randomUUID();

      await conn.query(
        `INSERT INTO usuarios (id, nombre, correo, contrasena, rol)
         VALUES (?, ?, ?, ?, ?)`,
        [uuidToBuffer(id), nombre, correo, contrasena, rol]
      );

      return { id, nombre, correo, rol };

    } catch (error) {
      throw new QueryError("Error al registrar usuario", 502, error);
    }
  }

  static async buscarTodos() {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(`
        SELECT id, nombre, correo, rol
        FROM usuarios
        ORDER BY creado_en DESC
      `);

      return rows.map(u => ({
        ...u,
        id: bufferToUuid(u.id)
      }));

    } catch (error) {
      throw new QueryError("Error al consultar usuarios", 502, error);
    }
  }

  static async buscarPorCorreo({ correo }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(`
        SELECT id, nombre, correo, contrasena, rol
        FROM usuarios
        WHERE correo = ?
      `, [correo]);

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

  static async buscarPorId({ id }) {
    const conn = await getConnection();

    try {
      const [rows] = await conn.query(
        `SELECT id, nombre, correo, rol
         FROM usuarios WHERE id = ?`,
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

  static async actualizar({ id, nombre }) {
    const conn = await getConnection();

    try {
      const [result] = await conn.query(
        `UPDATE usuarios SET nombre = ? WHERE id = ?`,
        [nombre, uuidToBuffer(id)]
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