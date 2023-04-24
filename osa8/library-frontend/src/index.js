import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

/* const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
}) */

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
  // link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
