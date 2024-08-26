import React from "react";
import "./PokemonFinalCard.css"; 

const PokemonFinalCard = ({ id, name, image }) => {
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

export default PokemonFinalCard;
