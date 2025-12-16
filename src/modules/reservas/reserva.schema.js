import { optional, z } from "zod";

export const validarCrearReserva = (data) => z.object({
  id_usuario: z.string().uuid(),
  id_aloja: z.string().uuid(),
  fecha_inicio: z.string().date(),
  fecha_fin: z.string().date(),
  precio_total: z.number().positive(),
  cantidad_huespedes: z.number().int().min(1)
}).safeParse(data);

export const validarEditarReserva = (data) => z.object({
  id: z.string().uuid(),
  status: z.number().optional(),
  fecha_inicio: z.string().date(),
  fecha_fin: z.string().date()
}).safeParse(data);

export const validarIdReserva = (data) => z.object({
  id: z.string().uuid()
}).safeParse(data);

export function errorFlattenError(err) {
  return err.flatten().fieldErrors;
}