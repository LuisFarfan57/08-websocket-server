const socketController = (socket) => {
    // client.on('event', data => { /* … */ });
    // client.on('disconnect', () => { /* … */ });
    
    //Se crea el id del socket
    console.log('Cliente conectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    })

    //El callback es la funcion definida en el cliente, se le envia la informacion que sea
    socket.on('enviar-mensaje', (payload, callback) => {
        //Para enviar eventos a todos los clientes
        //this.io.emit('enviar-mensaje', payload)
        //Tambien se puede enviar con socket, pero el socket solo emite al cliente que se conecto
        //Para que envie a todos se le agrega la propiedad broadcast
        //Al hacer esto, el que envio el mensaje no recibe el broadcast, unicamente la retroalimentacion
        socket.broadcast.emit('enviar-mensaje', payload)

        const retroalimentacion = {
            mensaje: `Mensaje ${payload.mensaje} enviado correctamente en la fecha ${payload.fecha}`
        }

        callback(retroalimentacion)

    })

    //Para desconectar
    //socket.disconect()
}

module.exports = socketController