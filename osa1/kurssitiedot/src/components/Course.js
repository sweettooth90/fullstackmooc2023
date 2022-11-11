const Course = ({courses}) => {
  return (
    <>
      <h2>Web development curriculum</h2>
      {courses
        .map(course =>
        <div key={course.id}>
          <h3>
            {course.name}
          </h3>
          <div>
            {course.parts
              .map(part =>
              <div key={part.id}>
                {part.name} {part.exercises}
              </div>
            )}
          </div>
          <div>
            <b>
              total of&nbsp; 
                {course.parts
                  .map(part => part.exercises)
                  .reduce((prev, curr) => prev + curr, 0)
                }
              &nbsp;exercises
            </b>
          </div>
        </div>
      )}
    </>
  )
}

export default Course
