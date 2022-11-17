import {useEffect, useState} from 'react'
import axios from 'axios'
import _ from 'lodash'

const FilterCountries = ({countryFilter, setCountryFilter}) => {
  return (
    <div>
      find countries <input value={countryFilter} onChange={event => setCountryFilter(event.target.value)} />
    </div>
  )
}

const WeatherInfo = ({weather}) => {
  const weatherIcon = weather.weather.map(weatherIcon => weatherIcon.icon)
  return (
    <>
      <div>temperature {(weather.main.temp - 273.15).toFixed(2)} celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} width="100" height="100" />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  )
}

const Weather = ({countries}) => {
  const [weatherData, setWeatherData] = useState()
  const city = countries.map(country => country.capital)
  const apiKey = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
  useEffect(() => {
    axios
      .get(url)    
      .then( response => {  
        setWeatherData(response.data)
      })
  }, [url])
  
  if (weatherData) {
    return <WeatherInfo weather={weatherData} />
  } else {
    return 'no weather information available...'
  } 
}

const CountryList = ({countries, countryFilter, setCountryFilter}) => {
  const showCountry = (countries) => {setCountryFilter(countries)}
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  const multiple =
    filteredCountries
      .map((country, i) =>
        <div key={i}>
          {country.name.common}&nbsp;
          <button onClick={() => showCountry(country.name.common)}>
            show
          </button>
        </div>
      )

  const single =
    filteredCountries
      .map((country, i) =>
        <div key={i}>
          <h2>{country.name.common}</h2>
          <div>capital: {country.capital}</div>
          <div>area: {country.area}</div>
          <h4>languages:</h4>
            <ul>
              {_.map(country.languages, lang => <li key={lang}>{lang}</li>)}
            </ul>
          <img src={country.flags.svg} width="200" height="150" />
          <h2>Weather in {country.capital}</h2>
          <Weather countries={filteredCountries} />
        </div>
      )

  return (
    <div>
      {filteredCountries.length >= 10
        ? 'Too many matches, specify another filter'
        : filteredCountries.length === 1
        ? single
        : multiple
      }

    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FilterCountries countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
      <CountryList countries={countries} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
    </div>
  )
}

export default App
