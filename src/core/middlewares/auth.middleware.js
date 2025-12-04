import jwt from "jsonwebtoken";
import { AuthError } from "../../modules/auth/auth.error.js";

export function verificarToken(req, res, next) {
  const token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) throw new AuthError("Token faltante", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.publicUser;  // ← incluye role
    next();
  } catch (error) {
    throw new AuthError("Token inválido o expirado", 401);
  }
}
