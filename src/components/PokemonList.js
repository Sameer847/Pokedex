import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector for Redux

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isBlack, setIsBlack] = useState(false);

  const selectedType = useSelector((state) => state.selectedType); // Get selected type from Redux
  const selectedGeneration = useSelector((state) => state.selectedGeneration); // Get selected generation from Redux

  useEffect(() => {
    fetchPokemons();
  }, [selectedType, selectedGeneration]); // Re-fetch whenever selectedType or selectedGeneration changes

  const handleClick = () => {
    setIsBlack((prevState) => !prevState); // Toggle the color state
  };

  // Fetch Pokémon data by selected generation
  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      let generationUrl = `https://pokeapi.co/api/v2/pokemon?limit=300`; // Default: fetch all

      // If generation is selected, update the URL to fetch that generation's Pokémon
      if (selectedGeneration) {
        generationUrl = `https://pokeapi.co/api/v2/generation/${selectedGeneration}`;
      }

      console.log('Fetching from URL:', generationUrl);

      const response = await axios.get(generationUrl);
      const data = selectedGeneration ? response.data.pokemon_species : response.data.results;

      // Fetch details for each Pokémon
      const fetchedPokemons = await Promise.all(
        data.map(async (pokemon) => {
          try {
            // If fetching generation-specific data, pokemon.url is directly available
            const speciesUrl = selectedGeneration ? pokemon.url : pokemon.url;

            const speciesResponse = await axios.get(speciesUrl); // Fetch species data
            const pokemonDetailsUrl = selectedGeneration
              ? speciesResponse.data.varieties[0].pokemon.url // Get the default variety's URL
              : pokemon.url; // Use the directly available URL for default fetch
            const res = await axios.get(pokemonDetailsUrl); // Fetch details using the Pokémon details URL
            const details = res.data;

            // Filter by selected type (if a type is selected)
            const hasSelectedType = selectedType
              ? details.types.some(
                  (type) => type.type.name.toLowerCase() === selectedType.toLowerCase()
                )
              : true; // If no type is selected, include all Pokémon

            if (hasSelectedType) {
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default
              };
            }
            return null; // Exclude Pokémon that don't match the type
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null; // Handle errors and continue
          }
        })
      );

      // Remove null values and update state
      setPokemons(fetchedPokemons.filter((pokemon) => pokemon !== null));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container" id="myPokemonList" style={{ background: isBlack ? "black" : "" }}>
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
        {isLoading ? (
          <p>Loading Pokémon...</p>
        ) : filteredPokemons.length > 0 ? (
          filteredPokemons.slice(0, 10).map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} />
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
