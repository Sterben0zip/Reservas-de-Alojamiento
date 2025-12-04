import { Router } from 'express'
import { AlojaController } from './aloja.controller.js'
import { authCookieMiddleware } from '../../core/middlewares/authCookie.js';

export const alojaRouter = () => {
  
    const alojaRouter = Router()
    const alojaController = new AlojaController()
 
    alojaRouter.get('/consultar', authCookieMiddleware, alojaController.consultar)
    alojaRouter.post('/crear', authCookieMiddleware, alojaController.crear)
    alojaRouter.put('/editar', authCookieMiddleware, alojaController.editar)
    alojaRouter.delete('/eliminar', authCookieMiddleware, alojaController.eliminar)
   
    return alojaRouter
}
