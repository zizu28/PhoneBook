const Header = ({ course }) => {
    return(
        <h1>{course.name}</h1>
    )
  }

const Part = ({ part }) => {
    return(
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    return(
      <div>
        {parts.map((part, i) => 
          <div key={i}>
            <Part part={part} />
          </div>
          )}
      </div>
    )
  }

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts} key={course.parts.id}/>
      </div>
    )
  }

  export default Course
