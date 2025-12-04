import { validatereseId, validatereseNombreId, errorFlattenError} from './rese.schema.js'
import { reseService } from './rese.service.js'

export class ReseController {

  consultar = async (req, res, next) => {

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

      const result = validatereseNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await reseService.actualizarNombrePorId({nombre, id})

      res.status(201).json({
        status: "success", 
        rese: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  eliminar = async (req, res, next) => {

    try {

      const result = validatereseId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await reseService.eliminarPorId({id})

      res.status(201).json({
        status: "success", 
        rese: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

