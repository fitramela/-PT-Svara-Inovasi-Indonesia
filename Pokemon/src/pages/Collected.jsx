import { useContext, useState } from 'react';
import { PokemonContext } from '../context';
import Sidebar from "../components/sideBar.jsx";
import PokemonList from "../components/myPokemonList.jsx";
import "../cssPage/HomePage.css";

export default function SavedPokemonPage() {
  const { savedPokemon } = useContext(PokemonContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
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
          <PokemonList
            pokemons={paginatedPokemon}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredPokemon.length}
            onPageChange={handlePageChange}
          />
        </main>
        <footer className="footer">
          <p>&copy; Pokémon Portal</p>
        </footer>
      </div>
    </div>
  );
}
