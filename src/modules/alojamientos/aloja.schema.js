import z from 'zod'

const alojaIdSchema = z.object({
  id: z.string().min(1)
})

const alojaNombreIdSchema = z.object({
  id: z.string().min(1), 
  nombre: z.string().min(1)
})

export function validatealojaId (input) {
  return alojaIdSchema.safeParse(input)
}
export function validatealojaNombreId (input) {
  return alojaNombreIdSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}
const alojaCrearSchema = z.object({
  nombre: z.string().min(1)
})

export function validatealojaCrear(input) {
  return alojaCrearSchema.safeParse(input)
}
