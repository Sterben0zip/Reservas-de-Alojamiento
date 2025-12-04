import z from 'zod'

const reservaIdSchema = z.object({
  id: z.string().min(1)
})

const reservaNombreIdSchema = z.object({
  id: z.string().min(1), 
  nombre: z.string().min(1)
})

export function validatereservaId (input) {
  return reservaIdSchema.safeParse(input)
}
export function validatereservaNombreId (input) {
  return reservaNombreIdSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}

