import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {gql, useApolloClient, useQuery} from '@apollo/client'
import {ALL_AUTHORS} from './queries'


const App = () => {
  const [page, setPage] = useState('authors')

  // const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {page === 'authors' &&
        <Authors />
      }

      {page === 'books' &&
        <Books />
      }

      {page === 'add' &&
        <NewBook />
      }
    </div>
  )
}

export default App
