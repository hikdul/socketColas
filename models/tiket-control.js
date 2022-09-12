const path = require('path')
const fs = require('fs')
const Ticket = require('./ticket')

class ticketControl
{
    constructor()
    {
        this.last = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.last4 = []

        this.init()
    }
    
    get toJson()
    {
        return{
            last   :this.last, 
            today  :this.today,
            tickets:this.tickets,
            last4  :this.last4
        }
    }
    
    init()
    {
        const {last, today, tickets, last4} = require('../db/data.json')
        if(today === this.today)
        {
            this.tickets = tickets
            this.last4 = last4
            this.last = last
        }
        else
            this.saveDB()
    }
    
    saveDB()
    {
        const dbpath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbpath, JSON.stringify(this.toJson ))
    }
    
    nextTk()
    {

        this.last++
        this.tickets.push(new Ticket(this.last,  null))
        this.saveDB()

        return 'Create new ticket, id = ', this.last
    }
    
    serveTk(desk)
    {
        if(this.tickets.length <= 0)
            return null
        
        const tk = this.tickets.shift()
        
        tk.desk = desk
        
        // add element to start the  array
        this.last4.unshift(tk)
        
        if(this.last4.length > 4)
            this.last4.splice(-1,1)
        
        this.saveDB()
        
        return tk
    }   
    
}

module.exports = ticketControl