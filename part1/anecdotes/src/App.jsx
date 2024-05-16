// Anecdotes
// ejercicios 1.12, 1.13, 1.14

import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Titulo = ({text}) => <h1>{text}</h1>
const Button = ({text,handleClick}) =><button onClick={handleClick}>{text}</button>
const Texto = ({text}) => <p>{text}</p>

//Main
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const lenght = getRandomInt(anecdotes.length);

  const [selected, setSelected] = useState(getRandomInt(lenght))
  const [points,setVotes] = useState(Array(anecdotes.length).fill(0))

  //valor maximo de un array
  let maxArray = points.indexOf(Math.max(...points))

  const getAnecdota = () => setSelected(getRandomInt(anecdotes.length)) 

  const updateVotes = () => { 
    const copy = [...points]
    copy[selected]+=1
    return setVotes(copy)
  }

  console.log(points)
  console.log(maxArray)
  return (
    <div>
      <Titulo text="Anecdote of the day" />
      {anecdotes[selected]}
        <Texto text={"has " + points[selected] +" votes"} />
      <p>
        <Button text={"Vote"} handleClick={updateVotes} />
        <Button text={"Next Anecdote"} handleClick={getAnecdota} />
      </p>
      <Titulo text="Anecdote with most votes" />
      <Texto text={anecdotes[maxArray]} />
    </div>
  )
}

export default App
