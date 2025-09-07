/* eslint-disable no-case-declarations */
import { createSlice,current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state,action){
      console.log(current(state))
      return state.map(anecdote => anecdote.id !== action.payload.id? anecdote : action.payload)
    },
    addAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { voteFor, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.modifyAnecdote(anecdote)
    dispatch(voteFor(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer