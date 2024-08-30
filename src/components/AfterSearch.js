import React, { useState } from "react";
import PokemonFinalCard from "./PokemonFinalCard";
import "./PokemonFinalCard.css";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import back from "../assets/back.png";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get passed data
import { useTheme } from '../components/ThemeContext'; 

const AfterSearch = () => {
  const { state } = useLocation(); // Access passed state (Pokémon details)
  const { pokemon } = state || {}; // Destructure passed Pokémon data
  const { isBlack, toggleTheme } = useTheme(); // Use context

  const handleClick = () => {
    toggleTheme(); // Toggle theme using context
  };

  return (
    <div className="pokemon-list-container" style={{ background: isBlack ? 'black' : '' }}>
      <div className="header">
        <img src={Logo} alt="Pokemon Logo" className="pokemon-logo" />
      </div>
      <br />
      <div className="first-container">
        <Link to="/type" className="menus">
          <div className="menu">
            <img src={back} alt="Back Logo" className="back-logo" />
          </div>
        </Link>

        <div className="search">
          <SearchBar />
        </div>

        <div className="mode" onClick={handleClick}>
          <img src={mode} alt="Mode Logo" className="mode-logo" />
        </div>
      </div>
      <br />
      <br />

      <div className="pokemon-results-container">
        {pokemon ? (
          <PokemonFinalCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types} 
          />
        ) : (
          <p>No Pokémon data available.</p>
        )}
      </div>
    </div>
  );
};

export default AfterSearch;
