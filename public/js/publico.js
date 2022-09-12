const lblTicket1 = document.getElementById('lblTicket1')
const lblTicket2 = document.getElementById('lblTicket2')
const lblTicket3 = document.getElementById('lblTicket3')
const lblTicket4 = document.getElementById('lblTicket4')

const lblEscritorio1 = document.getElementById('lblEscritorio1')
const lblEscritorio2 = document.getElementById('lblEscritorio2')
const lblEscritorio3 = document.getElementById('lblEscritorio3')
const lblEscritorio4 = document.getElementById('lblEscritorio4')

const socket = io();

socket.on('actual-state', (payload) => {
    
    const audio = new Audio('./audio/new-ticket.mp3')
    audio.play()

    const [tk1, tk2, tk3, tk4] = payload
    
    lblTicket1.innerText = 'Tiket ' + tk1.id
    lblEscritorio1.innerText = tk1.desk
    
    lblTicket2.innerText = 'Tiket ' + tk2.id
    lblEscritorio2.innerText = tk2.desk

    lblTicket3.innerText = 'Tiket ' + tk3.id
    lblEscritorio3.innerText = tk3.desk

    lblTicket4.innerText = 'Tiket ' + tk4.id
    lblEscritorio4.innerText = tk4.desk

})
