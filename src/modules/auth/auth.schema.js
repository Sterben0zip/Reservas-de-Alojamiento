import z from 'zod'
import { ROLES } from "../../core/roles/roles.js";
const validRoles = Object.values(ROLES);

const authRegisterSchema = z.object({
  usuario: z.string().min(1),
  password: z.string().min(1),
  nombre: z.string(),
  id_rol: z.number().int().refine(val => validRoles.includes(val), {
    message: "Rol inválido"
  })
});

const authLoginSchema = z.object({
  usuario: z.string().min(1),
  password: z.string().min(1),
})

export function validateAuthRegister (input) {
  return authRegisterSchema.safeParse(input)
}

export function validateAuthLogin (input) {
  return authLoginSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}

