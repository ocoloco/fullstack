import InputLine from './InputLine'
import Button from './Button'

const Formulario = ({addContact,name,phone,handleNameChange,handlePhoneChange}) => (
    <div>
      <form onSubmit={addContact}>
        <InputLine text="name: " value={name} onChange={handleNameChange} />
        <InputLine text="phone: " value={phone} onChange={handlePhoneChange} />
        <Button text="add contact" />
      </form>
    </div>
  )

  export default Formulario