import { z } from "zod";

export const validarCrearRese = (data) => z.object({
  id_usuario: z.string().uuid(),
  id_aloja: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comentario: z.string().min(3)
}).safeParse(data);

export const validarEditarRese = (data) => z.object({
  id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comentario: z.string().min(3)
}).safeParse(data);

export const validarIdRese = (data) => z.object({
  id: z.string().uuid()
}).safeParse(data);

export const errorFlattenError = (err) => {
  return err.flatten().fieldErrors;
};