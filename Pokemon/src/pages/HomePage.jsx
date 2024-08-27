import { useState } from 'react';
import PokemonList from "../components/pokemonList.jsx";
import Sidebar from "../components/sideBar.jsx"; 
import "../cssPage/HomePage.css";

export default function HomePage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="homepage-container">
      <Sidebar /> 
      <div className="main-content">
        <header className="header">
          <h1>Pokédex</h1>
        </header>
        <main className="pokemon-list-container">
          <div className="filters">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select onChange={handleTypeChange} value={typeFilter}>
              <option value="">All Types</option>
              <option value="grass">Grass</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
            </select>
          </div>
          <PokemonList
            typeFilter={typeFilter}
            searchQuery={searchQuery}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
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
