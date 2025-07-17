import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
 
  const [selected, setSelected] = useState(0)
  const [winner, setWinner] = useState(0)
  const [maxVotes,setMaxVotes] = useState(0)
  const [votes,setVotes] = useState(new Uint8Array(anecdotes.length))
  const copy = [...votes]

  const setAnectode = () => {
    const nextAnecdote = getRandomInt(0,anecdotes.length)
    setSelected(nextAnecdote)
  }

  const getRandomInt = (min,max) => {
    const minCieled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCieled) + minCieled)
  }
  
  

  const voteForAnecdote = () => {
    copy[selected] += 1
    setVotes(copy)

        //Highest vote registered
    const tempCopy = [...copy] 
    const maxVotes = tempCopy.sort((a,b) => a - b).reverse()[0]
    console.log('Max votes', maxVotes)

    //One with highest vote
    const winningAnecdote = copy.indexOf(maxVotes)
    console.log('Winner', winningAnecdote)
    console.log('Votes Array', copy)
    setWinner(winningAnecdote)
    setMaxVotes(maxVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={setAnectode}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[winner]} <br/> has {maxVotes} votes</p>
    </div>
  )
}

export default App