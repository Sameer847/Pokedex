// Original code current 
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Logo from "../assets/pokemon.svg";
import mode from "../assets/mode.png";
import menu from "../assets/menu.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { useTheme } from '../components/ThemeContext'; // Import useTheme
import style from "./PokemonCard.module.css";

const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [page, setPage] = useState(0); // For pagination
  const [hasMore, setHasMore] = useState(true); // To track if there are more Pokémon to load

  const selectedType = useSelector((state) => state.selectedType); 
  const selectedGeneration = useSelector((state) => state.selectedGeneration);

  const { isBlack, toggleTheme } = useTheme(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPokemons(); 
  }, [selectedType, selectedGeneration, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      let generationUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`; 

      if (selectedGeneration) {
        generationUrl = `https://pokeapi.co/api/v2/generation/${selectedGeneration}`;
      }

      const response = await axios.get(generationUrl);
      const data = selectedGeneration
        ? response.data.pokemon_species
        : response.data.results;

      const fetchedPokemons = await Promise.all(
        data.map(async (pokemon) => {
          try {
            const speciesUrl = selectedGeneration ? pokemon.url : pokemon.url;
            const speciesResponse = await axios.get(speciesUrl);
            const pokemonDetailsUrl = selectedGeneration
              ? speciesResponse.data.varieties[0].pokemon.url 
              : pokemon.url;
            const res = await axios.get(pokemonDetailsUrl);
            const details = res.data;

            const hasSelectedType = selectedType
              ? details.types.some(
                  (type) =>
                    type.type.name.toLowerCase() === selectedType.toLowerCase()
                )
              : true;

            if (hasSelectedType) {
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default,
                types: details.types.map((type) => type.type.name),
                moves: details.moves
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null;
          }
        })
      );

      const newPokemons = fetchedPokemons.filter((pokemon) => pokemon !== null);
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      
      if (newPokemons.length === 0) setHasMore(false); // Stop if no more Pokémon
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const filteredPokemons = pokemons.filter((pokemon) =>
  //   pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

   // Filtering logic: Show only the searched Pokémon if a search term exists
   const filteredPokemons = searchTerm
   ? pokemons.filter((pokemon) =>
       pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
     )
   : pokemons; // Otherwise, show all pokemons

  const handleCardClick = (pokemon) => {
    navigate("/afterSearch", { state: { pokemon } });
  };

  return (
    <div
      className={style.pokemonListContainerss}
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

        <div className="mode" onClick={toggleTheme}>
          <img src={mode} alt="Mode Logo" className="mode-logo" />
        </div>
      </div>
      <br />
      <div className={style.pokemonlist}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              moves={pokemon.moves}
              onClick={() => handleCardClick(pokemon)}
            />
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
      {isLoading && <p>Loading more Pokémon...</p>}
    </div>
  );
};

export default PokemonList;
