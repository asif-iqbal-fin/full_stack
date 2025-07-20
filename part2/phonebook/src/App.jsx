import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Person to add',newName)
    const nameObj = {name: newName}
    if(persons.findIndex(({name}) => name === newName) == -1){
      setPersons(persons.concat(nameObj))
      setNewName('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleNameChange =(event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </ul>
    </div>
  )
}

export default App