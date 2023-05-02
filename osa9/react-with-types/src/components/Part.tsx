import React from 'react'
import {CoursePart} from "../types"

const Part: React.FC<{coursePart: CoursePart}> = ({coursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><i>{coursePart.description}</i></div>
        </>
      )
    case 'group':
      return (
        <>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div>Project exercises: {coursePart.groupProjectCount}</div>
        </>
      )
    case 'background':
      return (
        <>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><i>{coursePart.description}</i></div>
        </>
      )
    case 'special':
      return (
        <>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><i>{coursePart.description}</i></div>
          <div>Required skills: {coursePart.requirements.join(', ')}</div>
        </>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part
