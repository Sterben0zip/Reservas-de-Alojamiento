import { alojaModel } from './aloja.model.js'
import { alojaError } from './aloja.error.js'

export class alojaService {
    
    static async consultar (){
        const result = await alojaModel.buscaralojaPorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await alojaModel.buscaralojaPorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await alojaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new alojaError("El usuario no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await alojaModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new alojaError(actualizacion.message, 401) }
        
        //Obtener la informacion del usuario
        const info = await alojaModel.buscaralojaPorId({id})    
        return info
    }

    static async eliminarPorId ({id}){

        //Verificar si existe el usuario
        const result = await alojaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new alojaError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await alojaModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new alojaError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
    
    static async crearAloja({ nombre }) {

    // OPCIONAL: validar que no exista
    // const existe = await alojaModel.buscarPorNombre({ nombre })
    // if (existe) throw new alojaError("El alojamiento ya existe", 400)

    const nuevo = await alojaModel.insertarAloja({ nombre })

    return nuevo
}

}
