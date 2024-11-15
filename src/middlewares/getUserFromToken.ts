import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function getUserIdFromToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT) // Substitua pelo seu segredo JWT
    req.user_id = decoded.sub.toString()
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
