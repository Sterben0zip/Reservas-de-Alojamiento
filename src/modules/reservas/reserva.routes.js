import { Router } from 'express'
import { ReservaController } from './reserva.controller.js'
import { authCookieMiddleware } from '../../core/middlewares/authCookie.js';

export const reservaRouter = () => {
  
    const reservaRouter = Router()
    const reservaController = new ReservaController()
 
    reservaRouter.get('/consultar', authCookieMiddleware, reservaController.consultar)
    reservaRouter.put('/editar', authCookieMiddleware, reservaController.editar)
    reservaRouter.delete('/eliminar', authCookieMiddleware, reservaController.eliminar)
    reservaRouter.post('/crear', authCookieMiddleware, reservaController.crear)
   
    return reservaRouter
}
