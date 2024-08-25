import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");

  useEffect(() => {
    fetchPokemons();
  }, [url]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
// console.log('first Data' ,data);

      const fetchedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          console.log('first Data' ,data);
          const res = await fetch(pokemon.url);
          const details = await res.json();
          console.log(details);
          
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default
          };
        })
      );
      setPokemons(fetchedPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <div className="header">
        <img src={Logo} alt="Pokemon Logo" className="pokemon-logo" />
      </div>
      <div className="first-container">
        <div className="menu">
          <img src={menu} alt="Menu Logo" className="menu-logo" />
        </div>

        <div className="search">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mode">
          <img src={mode} alt="Mode Logo" className="mode-logo" />
        </div>
      </div>
      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
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
