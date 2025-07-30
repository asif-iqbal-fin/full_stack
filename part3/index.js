require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
let persons = []

app.use(express.static('dist'))
app.use(express.json())

app.get('/api/persons',(request,response) => {
  console.log('Successfuully fetched persons JSON')
  Person.find({}).then(people => {
    persons = people
    response.json(people)
  })
})

app.get('/info', (request,response) => {
  const now = new Date().toString()
  const personInfo = `Phonebook has info of ${persons.length} people\n\n${now}`
  console.log(personInfo)
  response.end(personInfo)

})

app.get('/api/persons/:id', (request,response,next) => {
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
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number : body.number,
  })

  return person.save().then(newPerson => {
    console.log(newPerson)
    response.json(newPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
  const { name, number } = request.body

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

const unknownEndpoint = (request,response) => {
  return response.status(400).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
