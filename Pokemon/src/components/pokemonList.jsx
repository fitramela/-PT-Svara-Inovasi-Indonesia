import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => {
        const fetchData = async () => {
          const details = await Promise.all(response.data.results.map(pokemon => axios.get(pokemon.url)));
          setPokemons(details.map(d => d.data));
        };
        fetchData();
      });
  }, []);

  return (
    <div className="pokemon-container">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
          <Link to={`/pokemon/${pokemon.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
