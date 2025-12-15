import { z } from "zod";

export const validarCrearAloja = (data) => z.object({
  id_host: z.string().uuid(),
  titulo: z.string().min(3),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  capacidad: z.number().int().min(1),
  ubicacion: z.string().min(2),
  servicios: z.array(z.string()).default([])
}).safeParse(data);

export const validarEditarAloja = (data) => z.object({
  id: z.string().uuid(),
  titulo: z.string().min(3),
  descripcion: z.string().optional(),
  status: z.number().min(0).max (1),
  precio: z.number().positive(),
  capacidad: z.number().int().min(1),
  ubicacion: z.string().min(2),
  servicios: z.array(z.string()).default([])
}).safeParse(data);

export const validarIdAloja = (data) => z.object({
  id: z.string().uuid()
}).safeParse(data);

export const errorFlattenError = (err) => err.flatten().fieldErrors;