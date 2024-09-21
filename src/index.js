import React from 'react'
import ReactDOM from 'react-dom/client'

import { GlobalStyle, theme } from 'style'
import { ThemeProvider } from 'styled-components'
import App from 'App'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

reportWebVitals()
