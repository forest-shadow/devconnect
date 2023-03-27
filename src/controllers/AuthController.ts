import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HTTP_STATUS_CODE } from '../types/HTTP.types'

const NO_TOKEN_ERROR_MESSAGE = 'No token, authorization denied'
const INVALID_TOKEN_ERROR_MESSAGE = 'Token is not valid'

export class AuthController {
  static tokenCheckout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // get token from header
    const token = req.header('x-auth-token')

    // check if no token were passed
    if (!token) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ msg: NO_TOKEN_ERROR_MESSAGE })
    }

    // verify token
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      // @ts-ignore
      req.user = decoded.user
      next()
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ msg: INVALID_TOKEN_ERROR_MESSAGE })
    }
  }
}