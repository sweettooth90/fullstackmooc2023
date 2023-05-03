import {useEffect, useState} from "react"
import axios from "axios"
import {Diary, NewDiary, Visibility, Weather} from "./types"
import {getAllDiaries} from "./services/diaryService"
import './index.css'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {setDiaries(data)})
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiary: NewDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    
    try {
      await axios
        .post<Diary>('http://localhost:3001/api/diaries', newDiary)
        .then(response => setDiaries(diaries.concat(response.data)))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data)
        setTimeout(() => {setNotification('')}, 4000)
      } else {
        console.error(error)
      }
    }
    
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <div className="notification">{notification}</div>
      <form onSubmit={diaryCreation}>
        <div>
          date <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility &nbsp;
          <label htmlFor="great">great</label>
          <input type="radio" name="visibility" id="great" onChange={() => setVisibility(Visibility.Great)} />
          <label htmlFor="good">good</label>
          <input type="radio" name="visibility" id="good" onChange={() => setVisibility(Visibility.Good)} />
          <label htmlFor="ok">ok</label>
          <input type="radio" name="visibility" id="ok" onChange={() => setVisibility(Visibility.Ok)} />
          <label htmlFor="poor">poor</label>
          <input type="radio" name="visibility" id="poor" onChange={() => setVisibility(Visibility.Poor)} />
        </div>
        <div>
          weather &nbsp;
          <label htmlFor="sunny">sunny</label>
          <input type="radio" name="weather" id="sunny" onChange={() => setWeather(Weather.Sunny)} />
          <label htmlFor="rainy">rainy</label>
          <input type="radio" name="weather" id="rainy" onChange={() => setWeather(Weather.Rainy)} />
          <label htmlFor="cloudy">cloudy</label>
          <input type="radio" name="weather" id="cloudy" onChange={() => setWeather(Weather.Cloudy)} />
          <label htmlFor="stormy">stormy</label>
          <input type="radio" name="weather" id="stormy" onChange={() => setWeather(Weather.Stormy)} />
          <label htmlFor="windy">windy</label>
          <input type="radio" name="weather" id="windy" onChange={() => setWeather(Weather.Windy)} />
        </div>
        <div>
          comment <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
      
      <h2>Diary entries</h2>
      {diaries.map(diary =>
        <div key={diary.id} className="diaries">
          <b>{diary.date}</b>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      )}
    </div>
  )
}

export default App
