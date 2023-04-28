import patients from '../../data/patients'
import {NewPatient, NonSensitivePatientInfo, Patient} from '../types'
import {v4 as uuid} from 'uuid'

const getPatients = (): Patient[] => {
  return patients
}

const getPatientsNonSensitive = (): NonSensitivePatientInfo[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id)
  return entry
}

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid()
  const newPatient = {
    id: id,
    ...entry
  }

  patients.push(newPatient)
  return newPatient
}

export default {
  getPatientsNonSensitive,
  getPatients,
  findById,
  addPatient
}
