
import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

// Query Parameters: URL Stateful -> Filtros, paginação, não obrigatórios
// ex: http://localhost:3333/users?userId=1

// Route Parameters: Identificação de recursos
// ex: http://localhost:3333/users/1

// Request Body: Envio de informacoes de um formulario (HTTPS)


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)


    const route = routes.find(route => route.method === method && route.path.test(url))

    if (route) {
        const routeParams = req.url.match(route.path)
        console.log("🚀 ~ server ~ routeParams:", routeParams)
        return route.handler(req, res)
    }


    return res.writeHead(404).end()
})

server.listen(3333)