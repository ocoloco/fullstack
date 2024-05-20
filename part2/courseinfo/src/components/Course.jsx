const Total = ({parts}) =>{
    const suma = parts.reduce((total, item) => total + item.exercises, 0)
    return ( 
      <div>
        <b> total of {suma} exercises </b>
      </div>
    )
  }
  
  const Parts =({parts}) => {
    return (
      <div>
      {parts.map(item => 
        <p key={item.id}> 
          {item.name} {item.exercises}
        </p>
      )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div> 
        {course.map(item => 
          <div key={item.id}>
            <div><h1>{item.name}</h1></div>
            <Parts parts={item.parts}/>
            <Total parts={item.parts}/>
          </div>
        )}
      </div>
    )
  }

  export default Course