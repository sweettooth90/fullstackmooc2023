import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = anecdoteObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const operations = {getAll, createNew}

export default operations
