import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [savedPokemon, setSavedPokemon] = useState([]);

  const addPokemon = (pokemon, alias) => {
    setSavedPokemon(prev => [...prev, { ...pokemon, alias }]);
  };

  return (
    <PokemonContext.Provider value={{ savedPokemon, addPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
