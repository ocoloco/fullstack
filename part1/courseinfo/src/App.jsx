// Exercise 1.1

const Header = (props) => {
  return ( 
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
    {props.course.map((item) => {
      return (
          <div key={item.name}>
          <p> 
            {item.name} {item.exercises}
          </p></div>
        )
      })
    }
    </>
  )
}      
const Total = (props) => {
 const suma = props.course.reduce((totalCursos, item) => totalCursos + item.exercises, 0);
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
    part: [
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
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />   
      <Content course = {course.part} />
      <Total course = {course.part}/>
    </div>
  )
}

export default App
