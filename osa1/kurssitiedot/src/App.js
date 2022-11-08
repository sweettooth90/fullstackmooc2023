const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.course.parts.map(part => <div>{part.name} {part.exercises}</div>)}</p>
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts.map(part => part.exercises).reduce((prev, curr) => prev + curr, 0)
  return (
    <div>Number of exercises {total}</div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
