type RatingValue = 1 | 2 | 3

type RatingDescription = 'Well done' | 'Average' | 'Not Good'

export interface ExerciseValues {
  hours: Array<number>
  target: number
}

export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: RatingValue
  ratingDescription: RatingDescription
  target: number
  average: number
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 1) throw new Error('Not enough arguments')
  const exclude: Array<string> = args.slice(3)
  const numsArray: Array<number> = new Array<number>()

  exclude.forEach(value => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      numsArray.push(Number(value))
    } else {
      throw new Error('Provided values were not numbers!')
    }
  })
  
  return {
    hours: numsArray,
    target: Number(args[3])
  }
}

const calculateExercises = (hours: Array<number>, target: number) => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.filter(exerciseDay => exerciseDay > 0).length
  const totalHours: number = hours.reduce((acc, curr) => acc + curr, 0)
  const average: number = totalHours / periodLength
  const success: boolean = target < average

  let rating: RatingValue
  let ratingDescription: RatingDescription

  if (success) {
    rating = 1
    ratingDescription = 'Well done'
  } else if (target * 0.5 < average) {
    rating = 2
    ratingDescription = 'Average'
  } else {
    rating = 3
    ratingDescription = 'Not Good'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const {hours, target} = parseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}