import Ws from "../services/Ws"

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('news','Servidor escuhando')

  socket.on('my other event', (data) => {
    console.log(data)
  })

})
