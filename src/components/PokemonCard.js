import React from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";

const PokemonCard = ({
  species,
  variant,
  showNumber,
  clickHandler,
  getNumberWithLeadingZeros,
}) => {
  // Get pokemon information for display on the card
  const number = species.pokedex_numbers[0].entry_number;
  const name = variant.name;
  const types = variant.types;
  const image = variant.sprites.other["official-artwork"].front_default;

  const primaryTypeClass = `${types[0].type.name}-type`;

  // If the pokemon has a second type, get the second type class
  const secondaryTypeClass =
    types.length > 1 ? `${types[1].type.name}-secondary` : "";

  // If showNumber is true, render the number
  const numberClass = showNumber ? "pokemon-number" : "hidden-number";

  return (
    <div role="button" onClick={clickHandler.bind(this, {species:species, variant:variant})}>
      <Tilt
        className={`pokemon-card ${primaryTypeClass} ${secondaryTypeClass}`}
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
            <span className={`${numberClass}`}>
              {getNumberWithLeadingZeros(number, 3)}
            </span>
        <img src={image} alt={name} />
        <span className="pokemon-name">{name}</span>
      </Tilt>
    </div>
  );
};

export default PokemonCard;
