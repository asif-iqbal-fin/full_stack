/* eslint-disable no-case-declarations */
import { createSlice,current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state,action){
      state = [...state].sort((a,b) => b.votes - a.votes)
      state.push(action.payload)
      return state
    },
    voteFor(state,action){
      const id = action.payload
      const anecdoteToVote = state.find(ac => ac.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

      console.log(current(state))
      return state.map(anecdote => anecdote.id !== id? anecdote : votedAnecdote)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer