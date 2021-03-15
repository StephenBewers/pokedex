import React from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";

const PokemonCard = ({ number, name, types, image }) => {
  const primaryTypeClass = `${types[0].type.name}-type`;

  // If the pokemon has a second type, get the second type class
  const secondaryTypeClass = types.length > 1 ? `${types[1].type.name}-secondary` : "";

  return (
    <Tilt
      className={`pokemon-card ${primaryTypeClass} ${secondaryTypeClass}`}
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
    >
        <span className="pokemon-number">{number}</span>
        <img className="pokemon-img" src={image} alt={name} />
        <span className="pokemon-name">{name}</span>
    </Tilt>
  );
};

export default PokemonCard;
