import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , phoneNumber: '000 - 1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [phNumber,setPhNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Person to add',newName)
    const personObj = {name: newName, phoneNumber: phNumber}
    if(persons.findIndex(({name}) => name === newName) == -1){
      setPersons(persons.concat(personObj))
      setNewName('')
      setPhNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange =(event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setPhNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={phNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <p key={person.name}>{person.name} {person.phoneNumber}</p>)}
      </ul>
    </div>
  )
}

export default App