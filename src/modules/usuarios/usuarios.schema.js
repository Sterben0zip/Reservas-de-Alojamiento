import { z } from "zod";

export const validarCrearUsuario = (data) => z.object({
  nombre: z.string().min(2),
  correo: z.string().email(),
  contrasena: z.string().min(6),
  rol: z.enum(["CLIENTE", "HOST"]).default("CLIENTE")
}).safeParse(data);

export const validarEditarUsuario = (data) => z.object({
  id: z.string().uuid(),
  nombre: z.string().min(2),
  status: z.number().min(0).max (1),
}).safeParse(data);

export const validarIdUsuario = (data) => z.object({
  id: z.string().uuid()
}).safeParse(data);

export const errorFlattenError = (err) => err.flatten().fieldErrors;