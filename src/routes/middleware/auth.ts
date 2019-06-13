import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User from '../../models/User'

export const tokenCheckout = (req: Request, res: Response, next: NextFunction) => {
  // get token from header
  const token = req.header('x-auth-token')

  // check if no token were passed
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    // @ts-ignore
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json( { msg: 'Token is not valid' } )
  }
}

export const userAuthMiddleware = async (req: Request, res: Response) => {
  try {
    // find user by email; return user without password
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: `Unexpected server error.` })
  }
}
