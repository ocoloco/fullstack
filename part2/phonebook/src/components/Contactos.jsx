import Button from './Button'

const Contactos = ({text, handleClick}) => {
  if (text) { 
    return (
      text.map(item =>
        <div key={item.name}>
          {item.name} {item.number} <Button value={item.id} text="Delete" handleClick={handleClick}/>
        </div>
      )
    )
  } else return "No Data"
}

export default Contactos