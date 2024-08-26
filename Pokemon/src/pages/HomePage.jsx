import PokemonList from "../components/pokemonList";
import "../cssPage/HomePage.css"; // Custom CSS for styling

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Pokédex</h1>
      </header>
      <main className="pokemon-list-container">
        <PokemonList />
      </main>
      <footer className="footer">
        <p>&copy; Pokémon Portal</p>
      </footer>
    </div>
  );
}
