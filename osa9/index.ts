import express from 'express'
import {calculateBmi} from './bmiCalculator'

const app = express()
app.use(express.json())

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmi = calculateBmi(height, weight)

  if (isNaN(height) || isNaN(weight)) {
    res.json({error: 'malformatted parameters'})
  }

  res.json({height, weight, bmi})
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})