// referencias html
const lbl = document.querySelector('#lblNuevoTicket')
const btn = document.querySelector('button')

const socket = io();

socket.on('last-ticket', ticket => {
    lbl.innerText = ticket
})

btn.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lbl.innerText = ticket
    })
})
