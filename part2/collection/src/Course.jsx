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

export default Course