import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import HouseContextProvider from './Components/HouseContext.jsx'

const root = ReactDOM.createRoot(document.getElementById
  ('root'));
  root.render(
   <HouseContextProvider>
     <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
   </HouseContextProvider>
     
  )