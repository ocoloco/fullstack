// Exercise 1.1, 1.2, 1.3, 1.4, 1.5

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Part = (props) => {
  return (
    <>
      {props.parte.name} {props.parte.exercises} 
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.partes.parts.map((item,id) => { 
        return(
          <div key={id}>
            <Part parte = {item} />
          </div>   
        )
      })}
    </>
  )
}

const Total = (props) => {
  const suma = props.total.parts.reduce((totalCursos, item) => totalCursos + item.exercises, 0);
  return (
    <p>
      Number of exercises = {suma}
    </p>
  )
}

//Main
const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 0,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 1,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 2,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />  
      <Content partes = {course} />
      <Total total = {course} />
    </div>
  )
}

export default App