//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')


//Objecto que expone la libreria creada por socket.io
const socket = io()

//Listeners
socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = 'block'
})

socket.on('disconnect', () => {
    lblOnline.style.display = 'none'
    lblOffline.style.display = 'block'
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener('click', (e) => {
    const mensaje = txtMensaje.value

    const payload = {
        mensaje,
        id: '1234asdf',
        fecha: new Date().getTime()
    }

    //Emit para emitir un evento
    //Recomendacion no usar mayusculas o camel case ni cosas raras
    //Primer argumento es el nombre del evento
    //El tercer argumento es un callback que recibe una respuesta del servidor. Es la propiedad callback que le lleva al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Retroalimentacion del servidor ', id)
    })
})