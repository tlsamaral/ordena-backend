// types/socket.ts
import type { Server as SocketIOServer } from 'socket.io'

export interface CustomSocketServer extends SocketIOServer {
  userSockets: Map<string, string>
}
