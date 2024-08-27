import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {PokemonProvider} from './context.jsx'


createRoot(document.getElementById('root')).render(
  <PokemonProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </PokemonProvider>
)
