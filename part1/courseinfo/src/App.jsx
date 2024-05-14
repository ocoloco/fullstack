// Exercise 1.1, 1.2, 1.3

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.parte.name} {props.parte.exercises} 
    </p>
  )
}

const Total = (props) => {
  console.log({props})
  return (
  <p>
    Number of exercises = {props.total}
  </p>
  )
 /*const suma = props.course.reduce((totalCursos, item) => totalCursos + item.exercises, 0);
  return (
    <p>
      Number of exercises = {suma}
    </p>
  )*/
}

//Main
const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = {
    name :'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
        name: 'Using props to pass data',
        exercises: 7
  }
  const part3 = {
        name: 'State of a component',
        exercises: 14
  }

  return (
    <div>
      <Header course = {course} />  
      <Part parte = {part1} />
      <Part parte = {part2} />
      <Part parte = {part3} />
      <Total total = {part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

export default App