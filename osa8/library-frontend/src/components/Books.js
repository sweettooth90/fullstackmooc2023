import {useMutation, useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = () => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading || !books.data) {
    return <div>loading...</div>
  }
  console.log(books.data.allBooks.map(x => x))
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
