import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        handle(req, res, parsedUrl)
    })

    const io = new Server(httpServer, {
        cors: { origin: "*" }
    })

    io.on("connection", (socket) => {
        socket.on("joinCampaign", (campaignId: string) => {
            socket.join(campaignId)
        })

        socket.on("leaveCampaign", (campaignId: string) => {
            socket.leave(campaignId)
        })

        socket.on("updateCharacter", (data: { campaignId: string, character: unknown }) => {
            socket.to(data.campaignId).emit("characterUpdated", data.character)
        })
    })

    httpServer.listen(3000, () => {
        console.log("Server is running on http://localhost:3000")
    })
})

