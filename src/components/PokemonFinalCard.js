import React from "react";
import "./PokemonFinalCard.css";
import "./Type.css";
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const PokemonFinalCard = ({ id, name, image, types, moves }) => {
  const typeList = [
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
  const { isBlack, toggleTheme } = useTheme(); // Use context
  // Filter the typeList based on the types received from the API
  const matchedTypes = typeList.filter((type) =>
    types.some((apiType) => apiType.toUpperCase() === type.name)
  );

  console.log("Pokemon moves data:", moves); // Log in PokemonList or before passing to PokemonFinalCard

  return (
    <div className={`pokemon-card ${isBlack ? 'black_theme_two' : ''}`}>
      <img src={image} alt={name} />
      <div className="pokemon-info">
        <span>#00{id}</span>
        <h3>{name}</h3>
      </div>

      {/* <h3>{types}</h3> */}
      {/* <h3>Types: {types.join(", ")}</h3> */}
      <br />
      <div className="sec-container">
        <div className="pokemon-button-container">
          {matchedTypes.map((type, index) => (
            <button
              key={index}
              className={`btn btn-pokemon-type ${type.className}`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
<br />
<br />
      {/* <h3>{moves}</h3> */}
      <h3 className="acctack_mov">ATTACKS AND MOVEMENTS</h3>

      <div className="moves-container">
        {moves && moves.length > 0 ? (
          <ul>
            {moves.map((move, index) => (
              <li key={index}>{move.move.name}</li> // Adjust based on actual data structure
            ))}
          </ul>
        ) : (
          <p>No moves available</p>
        )}
      </div>
    </div>
  );
};

export default PokemonFinalCard;
