import { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  useEffect(() => {
    peopleService.getAll()
    .then(response => {
      console.log('Response from Service', response)
      setPersons(response)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Person to add',newName)
    const personObj = {name: newName, number: number}
    if(persons.findIndex(({name}) => name === newName) == -1){
      peopleService.create(personObj)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage(`Added ${personObj.name}`)
        setMessageClass('general')
        setTimeout(() => {
          setMessage(null)
        },5000)
        setNewName('')
        setNumber('')
      })
      
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new number`))
      {
        const personToUpdate = persons.find(({name}) => name === newName)
        console.log({personToUpdate})
        const updatedPerson = {...personToUpdate, number:number}
        console.log(updatedPerson)
        const revisedPersons = persons.map(person => person.name === newName ? updatedPerson :  person)
        console.log(revisedPersons)
        peopleService.update(updatedPerson.id, updatedPerson)
        .then(response => {
          console.log(response)
          setPersons(revisedPersons)
        })
      }else{
        console.log('User cancelled update')
      }
    }
  }

  const removePerson = (personToRemove) => {
    if(window.confirm(`Delete ${personToRemove.name} ?`)){
    console.log('Id to delete:',personToRemove.id)
    peopleService.remove(personToRemove.id)
    .then(response => {
      console.log('Person removed successfully',response.data)
      const personsSaved = persons.filter((person) => person.id !== personToRemove.id)
      setPersons(personsSaved)
      setMessage(`Information of ${personToRemove.name} removed from server`)
      setMessageClass('general')
      setTimeout(() =>{
        setMessage(null)
      },5000)
    })
    .catch(() => {
      setMessage(`Information of ${personToRemove.name} has already been removed from server`)
      setMessageClass('error')
      setTimeout(() =>{
        setMessage(null)
      },5000)
    })
  }
  else{
    console.log(`User cancelled delete of ${personToRemove.name}`)
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
      <Notification message={message} messageClass={messageClass}/>
      <Filter value={filter} onChange={handleFilterChange} />
      <div>debug: {newName}</div>
      <h3>add a new</h3>
      <PersonForm name={newName} number={number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Numbers personsToShow={personsToShow} removePerson={removePerson} />
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

const Person = ({person,deletePerson}) => {
  return(<div key={person.id}>
    {person.name} {person.number} {''}
    <button onClick={deletePerson}>Delete</button>
  </div>)
}

const Numbers = ({ personsToShow, removePerson }) => (
  <ul>
    {personsToShow.map(person => (
      <Person key={person.id} person={person} deletePerson={() => removePerson(person)} />
    ))}
  </ul>
)

const Notification = ({message,messageClass}) => {
  if(message === null){
    return null
  }
  return(
    <div className={messageClass}>
      {message}
    </div>
  )
}

export default App