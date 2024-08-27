import {createBrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import PokemonDetail from './pages/PokemonDetail'
import SavedPokemonPage from './pages/Collected'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,      
    },
    {
        path: 'pokemon/:id',
        element: <PokemonDetail/>
    },
    {
        path: 'collected',
        element: <SavedPokemonPage/>
    }
])

export default router