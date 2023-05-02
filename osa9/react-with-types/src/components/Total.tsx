import React from 'react'
import {CoursePart} from "../types"

const Total: React.FC<{courseParts: Array<CoursePart>}> = ({courseParts}) => {
  return (
    <div>
      <p>Number of exercises: {courseParts.reduce((prev, curr) => prev + curr.exerciseCount, 0)}</p>
    </div>
  )
}

export default Total
