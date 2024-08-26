import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PokemonList = ({ typeFilter, searchQuery, currentPage, itemsPerPage, onPageChange }) => {
  const [pokemons, setPokemons] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Fetch basic list of Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
        setTotalItems(response.data.count);

        // Fetch detailed data for each Pokémon
        const details = await Promise.all(
          response.data.results.map(pokemon => axios.get(pokemon.url))
        );
        setPokemons(details.map(d => d.data));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, [currentPage, itemsPerPage]);

  // Filter and search logic
  const filteredPokemons = pokemons
    .filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery))
    .filter(pokemon => !typeFilter || pokemon.types.some(type => type.type.name === typeFilter));

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate pagination range
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
        {filteredPokemons.map(pokemon => (
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
    typeFilter: PropTypes.string,
    searchQuery: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

export default PokemonList;
