import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Slider from 'react-slick';
import Sidebar from '../components/sideBar';
import { PokemonContext } from '../context';
import "../cssPage/PokemonDetail.css";

Modal.setAppElement('#root');

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [moveDetails, setMoveDetails] = useState([]);
  const [alias, setAlias] = useState("");
  const { addPokemon } = useContext(PokemonContext);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
        const moves = response.data.moves.map(move => {
          return axios.get(move.move.url).then(response => response.data);
        });
        Promise.all(moves).then(movesData => setMoveDetails(movesData));
      });
  }, [id]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSavePokemon = () => {
    addPokemon(pokemon, alias);
    alert(`${pokemon.name} with alias ${alias} added to your list!`);
  };

  const imageUrls = pokemon ? [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny,
    pokemon.sprites.other['official-artwork'].front_default,
    pokemon.sprites.other['official-artwork'].front_shiny
  ] : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    pokemon ? (
      <div className="pokemon-detail-container">
        <Sidebar />
        <div className="pokemon-detail-content">
          <header className="pokemon-header">
            <h2>{pokemon.name}</h2>
          </header>
          <main className="pokemon-main">
            <div className="pokemon-images">
              <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} onClick={openModal} />
              <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} onClick={openModal} />
            </div>
            <audio controls className="pokemon-audio">
              <source src={pokemon.cries?.latest || ""} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
            <div className="pokemon-info">
              <p><strong>Height:</strong> {pokemon.height} decimetres</p>
              <p><strong>Weight:</strong> {pokemon.weight} hectograms</p>
              <p><strong>Type:</strong> {pokemon.types[0].type.name} </p>
              <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
              <p><strong>Abilities:</strong></p>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}</li>
                ))}
              </ul>
              <div className="pokemon-moves">
                <h3>Moves</h3>
                <div className="moves-scroll">
                  {moveDetails.map((move, index) => (
                    <div key={index} className="move-item">
                      <h4>{move.name}</h4>
                      <p>{move.effect_entries.find(entry => entry.language.name === "en")?.short_effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pokemon-alias">
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Enter alias"
              />
            </div>
            <button className="pokemon-add-button" onClick={handleSavePokemon}>Save Pokémon</button>
          </main>
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Pokemon Images"
          className="pokemon-modal"
          overlayClassName="pokemon-modal-overlay"
        >
          <button onClick={closeModal} className="modal-close-button">X</button>
          <Slider {...settings}>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`pokemon ${index}`} className="modal-image" />
              </div>
            ))}
          </Slider>
        </Modal>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default PokemonDetail;
