import patients from '../../data/patients'
import {NonSensitivePatientInfo, Patient} from '../types'

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

export default {getPatientsNonSensitive, getPatients}
