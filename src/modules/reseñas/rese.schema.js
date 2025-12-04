import z from 'zod'

const reseIdSchema = z.object({
  id: z.string().min(1)
})

const reseNombreIdSchema = z.object({
  id: z.string().min(1), 
  nombre: z.string().min(1)
})

export function validatereseId (input) {
  return reseIdSchema.safeParse(input)
}
export function validatereseNombreId (input) {
  return reseNombreIdSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}

