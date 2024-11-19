import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import 'express-async-errors'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import http from 'http'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'

import { router } from './routes'
import type { CustomSocketServer } from './services/types/socket'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // Ajuste conforme necessário
  },
}) as CustomSocketServer
io.userSockets = new Map<string, string>()

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId as string
  if (userId) {
    console.log(`Conectado: userId ${userId} com socketId ${socket.id}`)
    io.userSockets.set(userId, socket.id)
  }
  console.log(io.userSockets)

  socket.on('disconnect', () => {
    console.log(`Desconectado: userId ${userId}`)
    io.userSockets.delete(userId)
  })
})

app.set('socketio', io)
app.use(express.json())
app.use(cors())
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

server.listen(3333, () => {
  console.log('🔥 Server is running!!!')
})
