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

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // Ajuste conforme necessário
  },
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
