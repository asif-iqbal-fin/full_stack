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

app.get('/api/persons/:id', (request,response,next) =>{
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person)
            }
            response.status(400).end()
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result =>{
            console.log(result)
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    if(!body.name){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number : body.number,
    })

    person.save().then(newPerson => {
        response.json(newPerson)
    })
    
    console.log(person)
})

app.put('/api/persons/:id',(request,response,next) => {
    const {name, number} = request.body

    Person.findById(request.params.id)
        .then(person => {
            if(!person)
            {
                return response.status(400).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                console.log(updatedPerson)
                response.json(updatedPerson)
            })

        })
        .catch(error => next(error))
})

const unknownEndpoint = (request,response) =>{
    return response.status(400).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) =>{
    console.error(error.message)

    if(error.name == 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
