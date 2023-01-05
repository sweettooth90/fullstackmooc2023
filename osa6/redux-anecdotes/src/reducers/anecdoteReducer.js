const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state
        .map(anecdote => anecdote.id !== id
          ? anecdote
          : votedAnecdote)
    case 'APPEND_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {id}
  }
}

export const setAnecdote = (content) => {
  return {
    type: 'APPEND_ANECDOTE',
    data: content
  }
}

export default anecdoteReducer
