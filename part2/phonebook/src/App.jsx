// Ejercicios 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15

import { useState, useEffect } from 'react'
import Contactos from './components/Contactos'
import Formulario from './components/Formulario'
import InputLine from './components/InputLine'
import personService from './services/persons'

//main
const App = () => {
  //Const states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone]= useState('')
  const [filterContacts,setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    let per = [];
    //Hay datos?
    if (persons.length > 0) { 
      if (per = persons.find((p) => p.name.toUpperCase() === newName.toUpperCase())){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with ${newPhone}?`)){
          const newContact = {
            name: per.name,
            number: newPhone,
            id: per.id
          }
          //Update json
          personService
          .update(per.id,newContact)
          .then(updatePerson =>{
            setPersons(persons.map(p => p.id !== per.id ? p : newContact))
            alert(`Contact ${updatePerson.name} phone updated`)
          })
        }
      } else {
        const newContact = {
          name: newName,
          number: newPhone
        }
        setPersons(persons.concat(newContact))
        // Save in json
        personService
        .create(newContact)
        .then(savePerson => {
          setPersons(persons.concat(savePerson))
          alert('Contact added to phonebook')
        })
      }
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event) =>{
    let who = persons.find((p) => p.id === event.target.value)
    if (window.confirm(`Delete ${who.name}`)) {
      // Delete in json
      personService
      .del(who.id)
      .then(delPerson => {
        // Hacer un filtro y actualizar
        const newArray = persons.filter(p => p.id != who.id)
        setPersons(newArray)
        alert(`Contact ${delPerson.name} deleted`)
      })  
    }
  }

  //Check data
  let filterPersons = (
    persons!=null ? 
      (persons.length>0 ? persons.filter(p => p.name.toUpperCase().includes(filterContacts.toUpperCase())) : "") 
    : "")

  return (
    <div>
      <h2>Phonebook</h2>
      <InputLine text="filter shown with" value={filterContacts} onChange={handleFilterChange} />   
      <h3> add a new </h3>
      <Formulario addContact={addContact} name={newName} phone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h3>Contact and Phone</h3>
      <Contactos text={filterPersons} handleClick={handleDelete}/>
    </div>
  )
}

export default App
