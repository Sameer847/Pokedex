import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon_small.png";
import close from "../assets/close.png";
import menu from "../assets/menu.png";
import "./Type.css";

const Type = () => {
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
          console.log("first Data", data);
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

  const types = [
    { name: "BUG", className: "btn-bug" },
    { name: "DARK", className: "btn-dark" },
    { name: "DRAGON", className: "btn-dragon" },
    { name: "ELECTRIC", className: "btn-electric" },
    { name: "FAIRY", className: "btn-fairy" },
    { name: "FIGHTING", className: "btn-fighting" },
    { name: "FIRE", className: "btn-fire" },
    { name: "FLYING", className: "btn-flying" },
    { name: "GHOST", className: "btn-ghost" },
    { name: "GRASS", className: "btn-grass" },
    { name: "GROUND", className: "btn-ground" },
    { name: "ICE", className: "btn-ice" },
    { name: "NORMAL", className: "btn-normal" },
    { name: "PLANT", className: "btn-plant" },
    { name: "POISON", className: "btn-poison" },
    { name: "PSYCHIC", className: "btn-psychic" },
    { name: "ROCK", className: "btn-rock" },
    { name: "STEEL", className: "btn-steel" },
    { name: "WATER", className: "btn-water" }
  ];

  return (
    <div className="pokemon-list-container">
      {/* <div className="header">
        <img src={Logo} alt="Pokemon Logo" className="pokemon-logo" />
      </div> */}
      <div className="first-container">
        <div className="logoes">
          <div className="menu">
            <img src={Logo} alt="Logo" className="logo" />
          </div>

          <div className="mode">
            <img src={close} alt="close Logo" className="close-logo" />
          </div>
        </div>

        <div className="mid-container">
          <h1>TYPE</h1>
        </div>

        <div className="sec-container">
          <div className="pokemon-button-container">
            {types.map((type, index) => (
              <button
                key={index}
                className={`btn btn-pokemon-type ${type.className}`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Type;
