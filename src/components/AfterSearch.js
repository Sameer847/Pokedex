import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";
import back from "../assets/back.png";
import { Link } from 'react-router-dom';
const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100");

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
      <br />
      <div className="first-container">
      <Link to="/type" className="menu">
      <div className="menu">
          <img src={back} alt="Back Logo" className="back-logo" />
        </div>
      </Link>
      

        <div className="search">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mode">
          <img src={mode} alt="Mode Logo" className="mode-logo" />
        </div>
      </div>
      <br />
      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (

          filteredPokemons.slice(0,10).map((pokemon) => (
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
