const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <div>
    <h1>Web development curriculum</h1>
    {courses.map(course => <Course course={course} />)}
  </div>
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
      <h2>{coursename}</h2>
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
      <b>Number of exercises {totalValue}</b>
    </div>
  )
}



export default App
