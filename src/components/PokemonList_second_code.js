// Final Code 
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
// import "./PokemonCard.module.css";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; 

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  // const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100");
  const [isBlack, setIsBlack] = useState(false);

  const selectedType = useSelector((state) => state.selectedType);

  useEffect(() => {
    fetchPokemons();
  }, [selectedType]);

  const handleClick = () => {
    setIsBlack((prevState) => !prevState); 
  };

  const fetchPokemons = async () => {
    try {
      let fetchedPokemons = [];

      if (selectedType) {
        // Fetch Pokemon based on the selected type
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType.toLowerCase()}`);
        const pokemonData = response.data.pokemon.map((poke) => ({
          name: poke.pokemon.name,
          url: poke.pokemon.url,
        }));

        // Fetch details for each Pokémon to get the image
        fetchedPokemons = await Promise.all(
          pokemonData.map(async (poke) => {
            const res = await axios.get(poke.url);
            return {
              id: res.data.id,
              name: poke.name,
              image: res.data.sprites.front_default,
            };
          })
        );
      } else {
        // Fetch all Pokémon if no type is selected
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();

        fetchedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
            };
          })
        );
      }

      setPokemons(fetchedPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="pokemon-list-container"
      id="myPokemonList"
      style={{ background: isBlack ? "black" : "" }}
    >
      <div className="header">
        <img src={Logo} alt="Pokemon Logo" className="pokemon-logo" />
      </div>
      <br />
      <div className="first-container">
        <Link to="/type" className="menu">
          <div className="menu">
            <img src={menu} alt="Menu Logo" className="menu-logo" />
          </div>
        </Link>

        <div className="search">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mode" onClick={handleClick}>
          <img src={mode} alt="Mode Logo" className="mode-logo" />
        </div>
      </div>
      <br />
      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (
          filteredPokemons
            .slice(0, 10)
            .map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
            ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
