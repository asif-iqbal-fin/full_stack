require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())


app.get('/api/persons',(request,response) => {
    console.log('Successfuully fetched persons JSON')
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/info', (request,response) => {
    const now = new Date().toString();
    const personInfo = `Phonebook has info of ${persons.length} people\n\n${now}`;
    console.log(personInfo)
    response.end(personInfo)

})

app.get('/api/persons/:id', (request,response) =>{
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    console.log(person)
    
    if(person){
        response.json(person)
    }else{
        response.status(400).end()
    }
})


app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const id = Math.round(Math.random() * 1000)

    const body = request.body
    const duplicatePerson = persons.find(p => p.name === body.name)
    if(!body.name | !body.number | (duplicatePerson !== undefined)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        name: body.name,
        number : body.number,
        id: String(id)
    }

    persons = persons.concat(newPerson)
    
    console.log(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
