import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({filter, anecdotes}) => {
      const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
      return filteredAnecdotes
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
      }


    return (
        <div>
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
      
    )
}

export default AnecdoteList
