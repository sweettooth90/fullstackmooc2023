import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteToVote = action.payload
      return state.map(anecdote =>
        anecdote.id !== anecdoteToVote.id
        ? anecdote
        : anecdoteToVote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const addVoteToAnecdote = (id, updated) => {
  return async dispatch => {
    const vote = await anecdoteService.update(id, updated)
    dispatch(voteAnecdote(vote))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const {appendAnecdote, setAnecdotes, voteAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer
