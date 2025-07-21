import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Person to add',newName)
    const personObj = {name: newName, number: number}
    if(persons.findIndex(({name}) => name === newName) == -1){
      setPersons(persons.concat(personObj))
      setNewName('')
      setNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = (filter === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange =(event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <div>debug: {newName}</div>
      <h3>add a new</h3>
      <PersonForm name={newName} number={number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

const Filter = ({value, onChange}) => {
  return(
    <div>
        filter shown with <input
        value={value}
        onChange={onChange}/>
      </div>
  )
}

const PersonForm = ({name, number, onNameChange, onNumberChange, onSubmit}) => {
  return(
    <form onSubmit={onSubmit}>
        <div>
          name: <input 
          value={name}
          onChange={onNameChange}/>
        </div>
        <div>
          number: <input 
          value={number}
          onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Numbers = ({personsToShow}) => {
  return(
    <ul>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </ul>
  )
}

export default App