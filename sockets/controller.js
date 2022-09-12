const ticketControl = require("../models/tiket-control");
const TC = new ticketControl()

const socketController = (socket) => {
    
    socket.emit('last-ticket', TC.last)
    socket.emit('actual-state', TC.last4)
    socket.emit('pending-tickets', TC.tickets.length )

    socket.on('next-ticket', ( payload, callback ) => 
    {
        const next = TC.nextTk()
        callback(next)
        socket.broadcast.emit('pending-tickets', TC.tickets.length )
        
    })
    
    socket.on('attend-ticket',({desk}, callback) =>{
        
        if(!desk)
            return callback({
                msg: 'el escritoria es obligatorio'
            })
            
        const ticket = TC.serveTk(desk)

        socket.broadcast.emit('actual-state', TC.last4)
        socket.emit('pending-tickets', TC.tickets.length )
        socket.broadcast.emit('pending-tickets', TC.tickets.length )
        
        if(!ticket)
            return callback({
                msg: 'Ya no hay tickets en cola'
            })

        callback({
            ticket
        })
    })

}

module.exports = {
    socketController
}

