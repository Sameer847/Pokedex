import React, { useState, useEffect } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ id, name, image }) => {
  // const [pokemons, setPokemons] = useState([]);
  // const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");

  // useEffect(() => {
  //   fetchPokemons();
  // }, [url]);

  // const fetchPokemons = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     // Log the raw data to the console
  //     console.log("API response data:", data);
      
  //     const fetchedPokemons = await Promise.all(
  //       data.results.map(async (pokemon) => {
  //         const res = await fetch(pokemon.url);
  //         const details = await res.json();
  //         return {
  //           id: details.id,
  //           name: details.name,
  //           image: details.sprites.front_default
  //         };
  //       })
  //     );
  //     setPokemons(fetchedPokemons);
  //   } catch (error) {
  //     console.error("Error fetching Pokémon data:", error);
  //   }
  // };

  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <div className="pokemon-info">
        <span>#{id}</span>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;
