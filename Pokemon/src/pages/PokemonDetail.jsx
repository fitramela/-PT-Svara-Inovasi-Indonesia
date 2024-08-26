import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/sideBar';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => setPokemon(response.data));
  }, [id]);

  return (
    pokemon ? (
      <div>
        <Sidebar/>
        <h2>{pokemon.name}</h2>
        {/* Image Slider */}
        <div>
          <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
          <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
        </div>

        {/* Audio Player */}
        <audio controls>
          <source src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>

        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>

        {/* Add Button */}
        <button onClick={() => alert(`${pokemon.name} added to your list!`)}>Add</button>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default PokemonDetail;
