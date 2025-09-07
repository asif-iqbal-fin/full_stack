import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async (content) => {
    const anecdote = {content,id: getId(),votes: 0}
    const response = await axios.post(baseUrl,anecdote)
    return response.data
}

const modifyAnecdote = async (anecdote) => {
    console.log(`Before Update - ${anecdote.votes}`)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
    console.log(`After Update - ${response.data.votes}`)
    return response.data 
} 

export default { getAll, addAnecdote,modifyAnecdote }