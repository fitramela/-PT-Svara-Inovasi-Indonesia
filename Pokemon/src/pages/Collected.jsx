// SavedPokemonPage.jsx
import { useContext, useState } from 'react';
import { PokemonContext } from '../context.jsx';
import Sidebar from "../components/sideBar.jsx";
import "../cssPage/HomePage.css";

export default function SavedPokemonPage() {
  const { savedPokemon } = useContext(PokemonContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPokemon = savedPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pokemon.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>My Saved Pokémon</h1>
        </header>
        <main className="pokemon-list-container">
          <div className="filters">
            <input
              type="text"
              placeholder="Search by name or alias"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="pokemon-list">
            {paginatedPokemon.length > 0 ? (
              paginatedPokemon.map((pokemon, index) => (
                <div key={index} className="pokemon-card">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <div className="pokemon-details">
                    <h3>{pokemon.alias} ({pokemon.name})</h3>
                    <p><strong>Type:</strong> {pokemon.types[0].type.name}</p>
                    <p><strong>Height:</strong> {pokemon.height} decimetres</p>
                    <p><strong>Weight:</strong> {pokemon.weight} hectograms</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Pokémon saved yet.</p>
            )}
          </div>
          {filteredPokemon.length > itemsPerPage && (
            <div className="pagination">
              {Array(Math.ceil(filteredPokemon.length / itemsPerPage))
                .fill()
                .map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
            </div>
          )}
        </main>
        <footer className="footer">
          <p>&copy; Pokémon Portal</p>
        </footer>
      </div>
    </div>
  );
}
