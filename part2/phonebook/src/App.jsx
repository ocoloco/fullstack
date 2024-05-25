/* Ejercicios 2.6, 2.7, 2.8, 2.9, 2.10, 
    2.11, 2.12, 2.13, 2.14, 
    2.15, 2.16, 2.17
*/

import { useState, useEffect } from 'react'
import Contactos from './components/Contactos'
import Formulario from './components/Formulario'
import InputLine from './components/InputLine'
import personService from './services/persons'
import Notificacion from './components/Notificacion'

//main
const App = () => {
  //Const states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone]= useState('')
  const [filterContacts,setNewFilter] = useState('')
  const CLEAR = {text:"",type:0}
  const [errorMessage, setErrorMessage] = useState(CLEAR)
 

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
          //Update json and catch
          personService
          .update(per.id,newContact)
          .then(updatePerson =>{
            setPersons(persons.map(p => p.id !== per.id ? p : newContact))
            const notice = {
              text: `Person "${per.name}" was phone update with: ${newPhone}`,
              type: 2
            }
            setErrorMessage(notice)
            setTimeout(() => {
              setErrorMessage(CLEAR)
            }, 5000)
          })
          .catch(error =>{
            const notice = {
              text:`Person '"${per.name}" was already removed from server: ${error}`,
              type: 1
            }
            setErrorMessage(notice)
            setTimeout(() => {
              setErrorMessage(CLEAR)
            }, 5000)
            setPersons(persons.filter(p => p.id !== per.id))
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
          const notice = {
            text: `Person "${newContact.name}" was added with: ${newContact.number} phone number`,
            type: 2
          }
          setErrorMessage(notice)
            setTimeout(() => {
              setErrorMessage(CLEAR)
            }, 5000)
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
        const notice = {
          text: `Person "${who.name}" was deleted`,
          type: 2
        }
        setErrorMessage(notice)
          setTimeout(() => {
            setErrorMessage(CLEAR)
          }, 5000)
      }) 
      .catch(error =>{
        const notice = {
          text:`Person '"${who.name}" was already removed from server: ${error}`,
          type: 1
        }
        setErrorMessage(notice)
        setTimeout(() => {
          setErrorMessage(CLEAR)
        }, 5000)
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
      <Notificacion message={errorMessage.text} type={errorMessage.type} />
      <InputLine text="filter shown with" value={filterContacts} onChange={handleFilterChange} />   
      <h3> add a new </h3>
      <Formulario addContact={addContact} name={newName} phone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h3>Contact and Phone</h3>
      <Contactos text={filterPersons} handleClick={handleDelete}/>
    </div>
  )
}

export default App
