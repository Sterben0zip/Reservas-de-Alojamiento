import { reseModel } from './rese.model.js'
import { reseError } from './rese.error.js'

export class reseService {
    
    static async consultar (){
        const result = await reseModel.buscarresePorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await reseModel.buscarresePorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await reseModel.existeUsuarioPorId({ id })  
        if(!result){ throw new reseError("El usuario no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await reseModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new reseError(actualizacion.message, 401) }
        
        //Obtener la informacion del usuario
        const info = await reseModel.buscarresePorId({id})    
        return info
    }

    static async eliminarPorId ({id}){

        //Verificar si existe el usuario
        const result = await reseModel.existeUsuarioPorId({ id })  
        if(!result){ throw new reseError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await reseModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new reseError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
}

