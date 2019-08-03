import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const tokenCheckout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    return res.status(401).json({ msg: 'Token is not valid' })
  }
}
