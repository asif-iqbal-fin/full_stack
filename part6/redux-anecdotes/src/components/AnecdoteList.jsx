import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(({filter, anecdotes}) => {
      const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
      return filteredAnecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log(`vote for - ${anecdote.id}`)
        dispatch(voteForAnecdote(anecdote))

        dispatch(setTimedNotification(`You voted for - ${anecdote.content}`,10))

        // //filter the anecdote by id 
        // // const anecdoteTitle = anecdotes.filter(anecdote => anecdote.id === id)[0].content
        // dispatch(setNotification(`Voted for - ${anecdote.content}`))
        
        // //wait for 5 second
        // setTimeout(() => {
        //   //remove the notification
        // dispatch(removeNotification(''))
        // }, 5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
      
    )
}

export default AnecdoteList
