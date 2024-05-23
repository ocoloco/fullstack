// Unicafe
// Ejercicio 1.6, 1.7, 1.8, 1.9, 1.10, 1.11

import { useState } from 'react'
 
const Title = ({titulo}) =><h1>{titulo}</h1>

const Button = ({handleClick,text}) =><button onClick={handleClick}>{text}</button>

const Stat = ({stat,text}) => <tr><td>{text}</td><td>{stat}</td></tr>
const StatPercentage = ({stat,text}) =><tr><td>{text}</td><td>{stat*100}%</td></tr>

const Statistics = ({ngood, nneutral, nbad, nall}) =>{
  //Check divide by 0
  const average = nall ? ((ngood-nbad)/nall):0
  const positive = nall ? (ngood / nall) : 0
  if (nall > 0){
  return (
      <table>
        <tbody>
          <Stat stat={ngood} text="Good"/>
          <Stat stat={nneutral} text="Neutral"/>
          <Stat stat={nbad} text="Bad"/>
          <Stat stat={nall} text="All" />
          <Stat stat={average} text="Average" />
          <StatPercentage stat={positive} text="Positive" />
        </tbody>
      </table>
    )
  }else{ 
    return <p>No feedback given</p>
  }
}

//Main
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
  }

  let all = good + neutral + bad;

  return(
    <div>
      <Title titulo="Give Feedback"/>
      <Button handleClick={updateVote("G")} text="Good"/>
      <Button handleClick={updateVote("N")} text="Neutral"/>
      <Button handleClick={updateVote("B")} text="Bad"/>
      <Title titulo="Statistics"/>
      <Statistics ngood={good} nneutral={neutral} nbad={bad} nall={all}/>
    </div>
  )
}

export default App