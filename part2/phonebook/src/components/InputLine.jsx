const InputLine = ({text,value,onChange}) => (
    <div>
      {text} <input type="text" id={text} value={value} onChange={onChange}/> 
    </div>
  )

  export default InputLine