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
      <Header coursename={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({coursename}) =>{
  return (
    <div>
      <h1>{coursename}</h1>
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

const Part = ({name,excercise}) =>{
  return(
    <div>
      <p>
        {name} {excercise}
      </p>
    </div>
  )
}

const Total = ({parts}) =>{
  const totalValue = parts.reduce((s,p) => {
    console.log('Values of past n current', s ,p)
    console.log('accumulated value', s)
    return s + p.exercises
  },0)
  return(
    <div>
      <p>Number of exercises {totalValue}</p>
    </div>
  )
}



export default App
