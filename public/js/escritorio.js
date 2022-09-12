const title = document.querySelector('h1')
const btn = document.querySelector('button')
const lbl = document.querySelector('small')
const divAwake = document.querySelector('.alert')
const lblPendientes = document.getElementById('lblPendientes')

const searchParams = new URLSearchParams(window.location.search)
if(!searchParams.has('escritorio'))
{
      window.location = 'index.html'
      throw new Error('El escritorio es OBLIGATORIO')
}

const socket = io();

const desk = searchParams.get('escritorio')
divAwake.style.display = 'none'
title.innerText = desk

socket.on('connect', () => {
    btn.disabled = false
});

socket.on('disconnect', () => {
    btn.disabled = true
});

socket.on('last-ticket', ticket => {
    console.log({ticket})
})

socket.on('pending-tickets', pending => {
    lblPendientes.innerText = pending
})

btn.addEventListener( 'click', () => {

    socket.emit('attend-ticket', {desk}, payload => {
        console.log({payload})

        const {ticket,msg} =  payload
        
        if(!ticket)
        {
            divAwake.style.display = ''
            divAwake.innerText = msg
            return;
        }

        const {id} = ticket
        lbl.innerText = id
    })

})