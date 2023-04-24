import {useState} from 'react'
import {useQuery} from '@apollo/client'
import {FIND_AUTHOR} from '../queries'


const Author = ({author, onClose}) => {
  return (
    <div>
      <h2>{author.name}</h2>
{/*       <div>
        {author.address.street} {author.address.city}
      </div>
      <div>{author.phone}</div> */}
      <button onClick={onClose}>close</button>
    </div>
  )
}


const Authors = ({authors}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_AUTHOR, {
    variables: {nameToSearch},
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Author
        author={result.data.findAuthor}
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      {authors.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show name?
          </button>
        </div>  
      )}
    </div>
  )
}

export default Authors
