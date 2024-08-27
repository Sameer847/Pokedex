import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector for Redux

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isBlack, setIsBlack] = useState(false);

  const selectedType = useSelector((state) => state.selectedType); // Get selected type from Redux

  useEffect(() => {
    fetchPokemons();
  }, [selectedType]); // Re-fetch whenever selectedType changes

  const handleClick = () => {
    setIsBlack((prevState) => !prevState); // Toggle the color state
  };

  const fetchPokemons = async () => {
    setIsLoading(true); 
    try {
      // Fetch the first 100 Pokémon
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=300");
      const data = response.data.results;


      console.log('Api all data', data);
      
      // Fetch details for each Pokémon
      const fetchedPokemons = await Promise.all(
        data.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          const details = res.data;
          
          console.log('Filtered Pokemons', details);
          // If no type is selected, return all Pokémon
          if (!selectedType) {
            return {
              id: details.id,
              name: details.name,
              // image: details.sprites.front_default
              image: details.sprites.front_default
            };
          }

          // Check if Pokémon has the selected type
          const hasSelectedType = details.types.some(
            (type) => type.type.name.toLowerCase() === selectedType.toLowerCase()
          );

          // Only include Pokémon with the selected type
          if (hasSelectedType) {
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default
            };
          } else {
            return null; // Filter out Pokémon that do not match the type
          }
        })
      );

      // Remove null values (Pokémon that did not match the type or when no type is selected)
      setPokemons(fetchedPokemons.filter(pokemon => pokemon !== null));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false); // Set loading to false once fetching is done
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log('Filtered Pokemons', filteredPokemons);

  return (
    <div className="pokemon-list-container" id="myPokemonList" style={{ background: isBlack ? 'black' : '' }}>
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
      {isLoading ? ( // Show loading indicator if data is still loading
          <p>Loading Pokémon...</p>
        ) : filteredPokemons.length > 0 ? (
          filteredPokemons.slice(0, 10).map((pokemon) => (

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
