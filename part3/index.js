import express, { json, request, response } from 'express'

const app = express()

var persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons',(request,response) => {
    console.log('Successfuully fetched persons JSON')
    response.send(persons)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
