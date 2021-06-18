import React from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";
import { getNumberWithLeadingZeros, textCleanup } from "../helpers.js";

const PokemonCard = ({ species, variant, showNumber, modalCard, clickHandler }) => {
  // Determines the class to use for the card
  const cardClass = modalCard ? "modal-card" : "pokemon-card";
  
  // Get pokemon information for display on the card
  const number = getNumberWithLeadingZeros(
    species.pokedex_numbers[0].entry_number,
    3
  );
  const name = textCleanup(variant.name);
  const types = variant.types;
  const image = variant.sprites.other["official-artwork"].front_default;

  const primaryTypeClass = `${types[0].type.name}-type`;

  // If the pokemon has a second type, get the second type class
  const secondaryTypeClass =
    types.length > 1 ? `${types[1].type.name}-secondary` : "";

  // If showNumber is true, render the number
  const numberClass = showNumber ? "pokemon-number" : "hidden-number";

  return (
    <div
      role="button"
      onClick={clickHandler.bind(this, { species: species, variant: variant })}
    >
      <Tilt
        className={`${cardClass} ${primaryTypeClass} ${secondaryTypeClass}`}
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <span className={`${numberClass}`}>{number}</span>
        <img src={image} alt={name} />
        <span className="pokemon-name">{name}</span>
      </Tilt>
    </div>
  );
};

export default PokemonCard;
