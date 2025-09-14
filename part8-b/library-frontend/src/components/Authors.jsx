import { useState } from "react"
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client/react"

/* eslint-disable react/prop-types */
const Authors = ({authors}) => {
  const[name,setName] = useState('')
  const[born,setBorn] = useState(1900)

  const [updateAuthor] = useMutation(UPDATE_AUTHOR,{refetchQueries: [{query: ALL_AUTHORS}, {query:ALL_BOOKS}]})

  const submit = async(event) => {
    event.preventDefault()
    console.log(`Name : ${name}`)
    console.log(`Born : ${born}`)

    updateAuthor({variables: {name,setBornTo:born}})

    setName('')
    setBorn(1900)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <input 
              value={name} 
              onChange={({target}) => setName(target.value)}>
            </input>
          </div>
          <div>
            born
            <input 
              type="Number" 
              value={born} 
              onChange={({target}) => setBorn(parseInt(target.value))}>
            </input>
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
