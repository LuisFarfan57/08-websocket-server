const express = require('express')
const cors = require('cors')

const socketController = require('../sockets/controller')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        //io es toda la informacion de los sockets conectados
        this.io = require('socket.io')(this.server);

        this.paths = {
            
        }

        //Middlewares: funciones que agregan funcionalidad al servidor
        this.middlewares()

        //Rutas de mi aplicación
        this.routes()

        //Sockets
        this.sockets()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        //Utilizar el server de socket.io
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}

module.exports = Server