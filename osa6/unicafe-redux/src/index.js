import React from 'react';
import ReactDOM from 'react-dom/client'
import {createStore} from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  const dispatchValue = (type) => {
    store.dispatch({
      type: type
    })
  }
  
  const average = (
    store.getState().good * 1 +
    store.getState().ok * 0 +
    store.getState().bad * -1
    ) / store.getState().all

  const positive = (
    store.getState().good * 100
  ) / store.getState().all

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => dispatchValue('GOOD')}>good</button>
      <button onClick={() => dispatchValue('OK')}>ok</button>
      <button onClick={() => dispatchValue('BAD')}>bad</button>
      <button onClick={() => dispatchValue('ZERO')}>reset stats</button>

      <h1>statistics</h1>
      <div>good: {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
      <div>all: {store.getState().all}</div>
      <div>average: {isNaN(average) ? 'no votes given' : average.toFixed(2)}</div>
      <div>positive: {isNaN(positive) ? 'no votes given': `${positive.toFixed(1)}%`}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
