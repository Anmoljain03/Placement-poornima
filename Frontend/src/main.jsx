
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'  // Make sure this path is correct
import { BrowserRouter } from 'react-router-dom'
// import "@fontsource/poppins"; // Defaults to 400 weight
// import "@fontsource/poppins/300.css"; // For lighter weights
// import "@fontsource/poppins/700.css"; // For bold weights
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
