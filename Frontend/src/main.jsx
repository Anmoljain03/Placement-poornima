import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 className='bg-red-500 text-2xl font-bold'>Hello World!</h1>
    <App />
  </StrictMode>,
)
