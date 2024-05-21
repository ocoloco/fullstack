// Ejercicios 2.6, 2.7, 2.8, 2.9, 2.10

import { useState } from 'react'

const Contactos = ({text}) => {
  return (
    text.map(item =>
      <div key={item.name}>
        <p>{item.name} {item.number}</p>
      </div>
    )
  ) 
}

const Filtrar = ({text, contacts, handleFilterChange}) => (
  <div>
    {text} <input value={contacts} onChange={handleFilterChange}/>
  </div>
)

const InputLine = ({text,value,onChange}) => (
  <div>
    {text} <input value={value} onChange={onChange}/> 
  </div>
)

const Button = ({text}) => (
  <div>
    <button type="submit">{text}</button>
  </div> 
)

const Formulario = ({addContact,name,phone,handleNameChange,handlePhoneChange}) => (
  <div>
    <form onSubmit={addContact}>
      <InputLine text="name: " value={name} onChange={handleNameChange} />
      <InputLine text="phone: " value={phone} onChange={handlePhoneChange} />
      <Button text="add contact" />
    </form>
  </div>
)

const Titulo =({text}) => <h3>{text}</h3>

//main
const App = () => {
  //Const states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone]= useState('')
  const [filterContacts,setNewFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (persons.find((p) => p.name.toUpperCase() === newName.toUpperCase())){

      alert(newName + ' is already added to phonebook')

    } else {

      const newContact = {
        name: newName,
        number: newPhone
      }

      setPersons(persons.concat(newContact))
    }
    setNewName('')
    setNewPhone('')
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

  let filterPersons = persons.filter(p => p.name.toUpperCase().includes(filterContacts.toUpperCase()))
  
  return (
    <div>
      <Titulo text="Phonebook" />
      <Filtrar text="filter shown with" contacts={filterContacts} handleFilterChange={handleFilterChange} />   
      <Titulo text="add a new" />
      <Formulario addContact={addContact} name={newName} phone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <Titulo text="Contact and Phone" />
      <Contactos text={filterPersons}/>
    </div>
  )
}

export default App
