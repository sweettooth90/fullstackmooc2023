import React from 'react'
import Part from './Part'
import {CoursePart} from '../types'

const Content: React.FC<{courseParts: Array<CoursePart>}> = ({courseParts}) => {
  return (
    <>
      {courseParts.map(part => <Part key={part.name} coursePart={part} />)}
    </>
  )
}

export default Content
