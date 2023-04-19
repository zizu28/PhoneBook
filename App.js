import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import EndPoints from './services/EndPoints'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [newPopup, setPopUp] = useState(null)

  //Fetch data from database
  useEffect(() => {
    EndPoints.getAll()
      .then(response =>{
        setPersons(response)
      })
      .catch(error =>{
        console.error(error)
      })
  }, [])

  //Form submission handler
  const handleOnSubmit = (event) => {
    event.preventDefault()
  
    const newObject = {
      name: newName,
      number: newNumber,
    }
  
    const existingPerson = persons.find(person => person.name === newName)
  
    if (existingPerson) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        EndPoints.update(existingPerson.id, newObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
            setNewName('')
            setNewNumber('')
            setPopUp(`Updated ${existingPerson.name}`)
          })
          .catch(error => {
            console.error(error)
          })
      }
    } else {
      EndPoints.create(newObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setPopUp(`Added ${newName}`)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }  
 
  //Event handler for filtering input
  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }
 
  //Event handler for input name change
  const handleOnNameChange = (event) => {
    setNewName(event.target.value)
  }

  const personsToFilter = persons.filter(person => 
    person.name.toLowerCase().includes(showAll.toLowerCase())
   )
   
  //Event handler for input number change
  const handleOnNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Event handler for deleting a person
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this person?`)) {
      EndPoints.delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleOnNameChange={handleOnNameChange}
        handleOnNumberChange={handleOnNumberChange}
          handleOnSubmit={handleOnSubmit}/>
      <h2>Numbers</h2>
      <Persons personsToFilter={personsToFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
