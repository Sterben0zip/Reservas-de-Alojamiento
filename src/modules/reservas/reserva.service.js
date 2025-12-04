import { reservaModel } from './reserva.model.js'
import { reservaError } from './reserva.error.js'

export class reservaService {
    
    static async consultar (){
        const result = await reservaModel.buscarreservaPorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await reservaModel.buscarreservaPorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await reservaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new reservaError("El usuario no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await reservaModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new reservaError(actualizacion.message, 401) }
        
        //Obtener la informacion del usuario
        const info = await reservaModel.buscarreservaPorId({id})    
        return info
    }

    static async eliminarPorId ({id}){

        //Verificar si existe el usuario
        const result = await reservaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new reservaError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await reservaModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new reservaError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
}

