import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}&nbsp;
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`))
  }

  return (
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(addVote(anecdote))}
        />
      )
  )
}

export default AnecdoteList
