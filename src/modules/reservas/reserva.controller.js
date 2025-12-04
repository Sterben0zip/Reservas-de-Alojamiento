import { validatereservaId, validatereservaNombreId, errorFlattenError} from './reserva.schema.js'
import { reservaService } from './reserva.service.js'

export class ReservaController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validatereservaId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await reservaService.consultarPorId({id})

      } else {
        resultado = await reservaService.consultar()
      }

      res.status(201).json({
        status: "success", 
        reserva: resultado
      })

    } catch (error) {
      next(error)
    }

  }

    crear = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validatereseId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await reseService.consultarPorId({id})

      } else {
        resultado = await reseService.consultar()
      }

      res.status(201).json({
        status: "success", 
        rese: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  editar = async (req, res, next) => {

    try {

      const result = validatereservaNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await reservaService.actualizarNombrePorId({nombre, id})

      res.status(201).json({
        status: "success", 
        reserva: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  eliminar = async (req, res, next) => {

    try {

      const result = validatereservaId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await reservaService.eliminarPorId({id})

      res.status(201).json({
        status: "success", 
        reserva: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}
