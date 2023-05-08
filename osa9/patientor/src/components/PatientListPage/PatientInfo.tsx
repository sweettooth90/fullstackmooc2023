import {useEffect, useState} from "react"
import {Patient, Diagnosis} from "../../types"
import patientService from "../../services/patients"
import diagnosisService from "../../services/diagnosis"
import {useParams} from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import MaleIcon from '@mui/icons-material/Male'


const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>()
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>()
  const id = useParams().id as string

  useEffect(()=> {
    const fetchSinglePatient = async () => {
      try {
        const fetchPatient = await patientService.getPatientById(id)
        setPatient(fetchPatient)
      } catch (error) {
        console.error('Fetching data failed', error)
      }
    }

    const fetchDiagnosis = async () => {
      try {
        const fetchPatientDiagnosis = await diagnosisService.getAll()
        setDiagnosis(fetchPatientDiagnosis)
      } catch (error) {
        console.error('Fetching data failed', error)
      }
    }

    fetchSinglePatient()
    fetchDiagnosis()
}, [id])

  if (!patient) {
    return null
  }

  const genderIcon = () => {
    if (patient.gender === 'male') {
      return <MaleIcon />
    } else if (patient.gender === 'female') {
      return <FemaleIcon />
    } else {
      return <TransgenderIcon />
    }
  }
  
  return (
    <div className="patientInfo">
      <h2>{patient.name} {genderIcon()}</h2>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3><b>entries</b></h3>
      <div>
        {patient.entries ? patient.entries.map(entry =>
          <div key={entry.id} className="patientEntry">
          <div>{entry.date} <i>{entry.description}</i></div>
          <div>
            {entry.diagnosisCodes &&
              <>
              {diagnosis?.filter(diagnose => 
                entry.diagnosisCodes?.includes(diagnose.code)).map((d, index) =>
                  <li key={index} className="diagnosisInfo">
                    {d.code} {d.name}
                  </li>
                )}
              </>
            }
          </div>
          </div>
          ) : ''
        }
      </div>
    </div>
  )
}

export default PatientInfo
