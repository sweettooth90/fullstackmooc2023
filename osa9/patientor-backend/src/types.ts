export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface Discharge {
  date: string
  criteria: string
}

export interface SickLeave {
  startDate: string
  endDate: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  sickLeave?: SickLeave
  employerName: string
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>

export type NewPatient = Omit<Patient, 'id'>

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}
