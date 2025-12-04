import { Router } from 'express'
import { ReseController } from './rese.controller.js'
import { authCookieMiddleware } from '../../core/middlewares/authCookie.js';

export const reseRouter = () => {
  
    const reseRouter = Router()
    const reseController = new ReseController()
 
    reseRouter.get('/consultar', authCookieMiddleware, reseController.consultar)
    reseRouter.post('/crear', authCookieMiddleware, reseController.crear)
    reseRouter.put('/editar', authCookieMiddleware, reseController.editar)
    reseRouter.delete('/eliminar', authCookieMiddleware, reseController.eliminar)
   
    return reseRouter
}
