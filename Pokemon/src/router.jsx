import {createBrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import PokemonDetail from './pages/PokemonDetail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,      
    },
    {
        path: 'pokemon/:id',
        element: <PokemonDetail/>
    }
])

export default router