import { useState } from 'react'

const Title = ({titulo,show}) => {
  if (!show){
    return <h1>{titulo}</h1>
  }
}

const Button = ({handleClick,text,show}) => {
  if (!show)
    return <button onClick={handleClick}>{text}</button>
}

const Stat = ({stat,text}) => <p>{text} {stat}</p>

const Resumen = ({show,ngood,nneutral,nbad}) =>{
  console.log(show)
  if (show){
    return (
      <>
      <Title titulo="Statistics"/>
      <Stat stat={ngood} text="Good"/>
      <Stat stat={nneutral} text="Neutral"/>
      <Stat stat={nbad} text="Bad"/>
      </>
    )
  }
}


//Main
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)
  const [votado, setVotado] = useState(0)

  const updateVote = (vote) => () =>{
    if (vote == "G"){
      setGood(good + 1)
    }
    if (vote == "N"){
      setNeutral(neutral + 1)
    }
    if (vote == "B"){
      setBad(bad + 1)    
    }
    setVotado(votado + 1)
  }

  return (
    <div>
      <Title titulo="Give Feedback" show={votado}/>
      <Button handleClick={updateVote("G")} text="Good" show={votado}/>
      <Button handleClick={updateVote("N")} text="Neutral" show={votado}/>
      <Button handleClick={updateVote("B")} text="Bad" show={votado}/>
      <Resumen show={votado} ngood={good} nneutral={neutral} nbad={bad} />
    </div>
  )
}

export default App