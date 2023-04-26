export interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number) => {
  const result = weight / (height/100 * height/100)

  if (result < 15) {
    return 'Underweight (Severe thinness)'
  } else if (result < 16.9) {
    return 'Underweight (Moderate thinness)'
  } else if (result < 18.4) {
    return 'Underweight (Mild thinness)'
  } else if (result < 24.9) {
    return 'Normal range'
  } else if (result < 29.9) {
    return 'Overweight (Pre-obese)'
  } else if (result < 34.9) {
    return 'Obese (Class I)'
  } else if (result < 39.9) {
    return 'Obese (Class II)'
  } else if (result >= 40) {
    return 'Obese (Class III)'
  } else {
    return 'Something else'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
