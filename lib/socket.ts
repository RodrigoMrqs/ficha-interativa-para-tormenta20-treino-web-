import type { Server as SocketIOServer } from "socket.io"

const globalForSocket = globalThis as unknown as { io: SocketIOServer | undefined }

export function setIO(io: SocketIOServer): void {
    globalForSocket.io = io
}

export function getIO(): SocketIOServer | null {
    return globalForSocket.io ?? null
}