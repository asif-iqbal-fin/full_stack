import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(({filter, anecdotes}) => {
      const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
      return filteredAnecdotes
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))

        //filter the anecdote by id 
        const anecdoteTitle = anecdotes.filter(anecdote => anecdote.id === id)[0].content
        dispatch(setNotification(`Voted for - ${anecdoteTitle}`))
        
        //wait for 5 second
        setTimeout(() => {
          //remove the notification
        dispatch(removeNotification(''))
        }, 5000)
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
