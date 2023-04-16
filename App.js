import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    for(const person of persons){
      if(JSON.stringify(newObject) === JSON.stringify(person)){
        alert(`${newName} is already added to the phonebook`)
      }
    }
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  } 

  
  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }
 
  const handleOnNameChange = (event) => {
    setNewName(event.target.value)
  }

  const personsToFilter = persons.filter(person => 
    person.name.toLowerCase().includes(showAll.toLowerCase())
   )
   
  const handleOnNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleOnNameChange={handleOnNameChange}
        handleOnNumberChange={handleOnNumberChange}
          handleOnSubmit={handleOnSubmit}/>
      <h2>Numbers</h2>
      <Persons personsToFilter={personsToFilter}/>
    </div>
  )
}

export default App
