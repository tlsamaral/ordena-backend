import type { Request } from 'express'
import jwt from 'jsonwebtoken'
export const getUserIdFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization
  if (!authHeader) return null

  const token = authHeader.split(' ')[1] // Supondo que o token esteja no formato "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT) // Substitua pelo seu segredo JWT
    return decoded.sub.toString()
  } catch (error) {
    console.error('Erro ao decodificar o token:', error)
    return null
  }
}
