import {useEffect, useState} from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({notification}) => {
  if (notification === null) {
      return null
  }

  const style =
    notification.type === 'success'
      ? 'notification success'
      : notification.type === 'error'
        ? 'notification error'
        : 'notification info'

  return (
    <div className={style}>
      {notification.text}
    </div>
  )
}

const FilterPersons = ({personFilter, setPersonFilter}) => {
  return (
    <div>
      filter shown with <input value={personFilter} onChange={event => setPersonFilter(event.target.value)} />
    </div>
  )
}

const PersonsList = ({persons, personFilter, deletePerson}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
        .map((person, i) =>
          <div className="note" key={i}>
            {person.name} {person.number} <button className="buttonDelete" onClick={() => deletePerson(person)}>delete</button>
          </div>
        )
      }
    </div>
  )
}

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange
}) => {

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" className="buttonAdd" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const showNotification = (text, type) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAllPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`"${personObject.name}" is already added, replace the old number with a new one?`)) {
        const newNum = persons.find(person => person.name === newName)
        const updatedNumber = {...newNum, number: newNumber}
        
        personService
          .updatePerson(newNum.id, updatedNumber)
          .then(updated => {
            setPersons(persons.map(person => person.id !== newNum.id ? person : updated))
            showNotification(`Person's "${personObject.name}" number has been updated`, 'info')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showNotification(`Information of "${personObject.name}" has already been deleted from the server`, 'error')
          })
      }
    } else {
      personService
        .createPerson(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          showNotification(`Person "${personObject.name}" has added successfully`, 'success')
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          personService.getAllPersons().then(response => setPersons(response))
          showNotification(`Person "${person.name}" has been deleted successfully`, 'success')
        })
        .catch(error => {
          showNotification(`Person "${person.name}" has already been deleted`, 'error')
        })
    }
  }

  return (
    <div id="phonebook">
      <h1>Phonebook</h1>
      <h3>Add a new number</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <FilterPersons
        personFilter={personFilter}
        setPersonFilter={setPersonFilter}
      />
      <Notification notification={notification} />
      <PersonsList
        persons={persons}
        personFilter={personFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
