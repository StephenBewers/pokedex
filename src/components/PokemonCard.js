import React from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";

const PokemonCard = ({ pokemon, clickHandler, getNumberWithLeadingZeros }) => {
  // Get pokemon information for display on the card
  const number = pokemon.pokedex_numbers[0].entry_number;
  const name = pokemon.name;
  const types = pokemon.defaultVariant.types;
  const image =
    pokemon.defaultVariant.sprites.other["official-artwork"].front_default;

  const primaryTypeClass = `${types[0].type.name}-type`;

  // If the pokemon has a second type, get the second type class
  const secondaryTypeClass =
    types.length > 1 ? `${types[1].type.name}-secondary` : "";

  return (
    <div role="button" onClick={clickHandler.bind(this, pokemon)}>
      <Tilt
        className={`pokemon-card ${primaryTypeClass} ${secondaryTypeClass}`}
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <span className="pokemon-number">
          {getNumberWithLeadingZeros(number, 3)}
        </span>
        <img src={image} alt={name} />
        <span className="pokemon-name">{name}</span>
      </Tilt>
    </div>
  );
};

export default PokemonCard;
