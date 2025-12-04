import { validatealojaId, validatealojaNombreId, errorFlattenError} from './aloja.schema.js'
import { alojaService } from './aloja.service.js'

export class AlojaController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validatealojaId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await alojaService.consultarPorId({id})

      } else {
        resultado = await alojaService.consultar()
      }

      res.status(201).json({
        status: "success", 
        aloja: resultado
      })

    } catch (error) {
      next(error)
    }

  }

crear = async (req, res, next) => {
  try {
    const result = validatealojaNombreId(req.body)
    if (!result.success) {
      return res.status(400).json({
        status: "error_bad_request",
        error: errorFlattenError(result.error)
      })
    }

    const { nombre } = req.body;
    const resultado = await alojaService.crearAloja({ nombre })

    res.status(201).json({
      status: "success",
      aloja: resultado
    })

  } catch (error) {
    next(error)
  }
}

  editar = async (req, res, next) => {

    try {

      const result = validatealojaNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await alojaService.actualizarNombrePorId({nombre, id})

      res.status(201).json({
        status: "success", 
        aloja: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  eliminar = async (req, res, next) => {

    try {

      const result = validatealojaId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await alojaService.eliminarPorId({id})

      res.status(201).json({
        status: "success", 
        aloja: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

