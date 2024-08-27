import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { PokemonContext } from '../context';

const PokemonList = ({ pokemons, currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const { removePokemon } = useContext(PokemonContext);

  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const paginationRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, 5);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    return { start, end };
  };

  const { start, end } = paginationRange();

  return (
    <div>
      <div className="pokemon-container">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <h3>{pokemon.name} {pokemon.alias}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {pokemon.types[0].type.name}</p>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>Alias: {pokemon.alias}</p>
            <div className="pokemon-card-buttons">
              <Link to={`/pokemon/${pokemon.id}`}>
                <button>View Details</button>
              </Link>
              <button onClick={() => removePokemon(pokemon.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>
        {start > 1 && <button onClick={() => onPageChange(1)}>1</button>}
        {start > 2 && <span>...</span>}
        {Array.from({ length: end - start + 1 }, (_, index) => start + index).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        {end < totalPages - 1 && <span>...</span>}
        {end < totalPages && <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

PokemonList.propTypes = {
  pokemons: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PokemonList;
