import {NewPatient, Gender} from "./types"

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Not a string...')
  }
  
  return text
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Not a date...' + date)
  }

  return date
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender missing...' + gender)
  }

  return gender
}

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    }
    return newEntry
  }
  throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatient
