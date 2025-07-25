import express from 'express'

const app = express()

const persons = [
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
