import { AuthError } from "../../modules/auth/auth.error.js";

export function requireRole(rolesPermitidos = []) {
  return (req, res, next) => {
    if (!req.user) throw new AuthError("No autenticado", 401);

    if (!rolesPermitidos.includes(req.user.role)) {
      throw new AuthError("No tienes permiso para realizar esta acción", 403);
    }

    next();
  };
}
