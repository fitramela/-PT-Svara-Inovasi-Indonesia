import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [savedPokemon, setSavedPokemon] = useState([]);

  const addPokemon = (pokemon, alias) => {
    setSavedPokemon(prev => [...prev, { ...pokemon, alias }]);
  };

  const removePokemon = (id) => {
    setSavedPokemon(savedPokemon.filter(pokemon => pokemon.id !== id));
  };

  return (
    <PokemonContext.Provider value={{ savedPokemon, addPokemon, removePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
