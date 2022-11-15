import {useEffect, useState} from 'react'
import axios from 'axios'

const FilterPersons = ({personFilter, setPersonFilter}) => {
  return (
    <div>
      filter shown with <input value={personFilter} onChange={event => setPersonFilter(event.target.value)} />
    </div>
  )
}

const PersonsList = ({persons, personFilter}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
        .map((person, i) => <div key={i}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  persons,
  setPersons,
  setNewName,
  setNewNumber,
  handleNameChange,
  handleNumberChange
}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.find(person => person.name === newName)
      ? alert(`${personObject.name} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
    persons.find(person => person.number === newNumber)
      ? alert(`${personObject.number} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons
        personFilter={personFilter}
        setPersonFilter={setPersonFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <PersonsList
        persons={persons}
        personFilter={personFilter}
      />
    </div>
  )

}

export default App
