// Exercise 1.1, 1.2, 1.3, 1.4

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  console.log({props})
  return (
    <p>
      {props.parte.name} {props.parte.exercises} 
    </p>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.partes.map((item) => { 
        return(
          <div key={item}>
            <Part parte = {item}/>
          </div>   
        )
      })}
    </p>
  )
}

const Total = (props) => {
  const suma = props.total.reduce((totalCursos, item) => totalCursos + item.exercises, 0);
  return (
    <p>
      Number of exercises = {suma}
    </p>
  )
}

//Main
const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const parts = [
  {
    name :'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {        
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header course = {course} />  
      <Content partes = {parts} />
      <Total total = {parts} />
    </div>
  )
}

export default App