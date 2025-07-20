const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
    </div>
  )
}

const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) =>{
return(
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} excercise={part.excercises} />)}
  </div>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>
        {props.name} {props.excercise}
      </p>
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      <p>Number of exercises {props.parts[0].excercises + props.parts[1].excercises + props.parts[2].excercises}</p>
    </div>
  )
}



export default App
