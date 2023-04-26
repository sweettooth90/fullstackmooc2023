import express from 'express'
import {calculateBmi} from './bmiCalculator'
import {calculateExercises} from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmi = calculateBmi(height, weight)

  if (isNaN(height) || isNaN(weight)) {
    res.json({error: 'malformatted parameters'})
  }
  
  res.json({height, weight, bmi})
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const {daily_exercises, target} = req.body
  const malformatted = res.status(400).send({error: 'malformatted parameters'})

  if (!daily_exercises || !target) {
    return res.status(400).send({error: 'parameters missing'})
  }

  if (isNaN(Number(target))) {
    return malformatted
  }

  if (Array.isArray(daily_exercises)) {
    daily_exercises.forEach(value => {
      if (isNaN(Number(value))) {
        return malformatted
      } else {
        return ''
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target)
  return res.send(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})