import React from "react";
import "./ModalImagePanel.scss";
import { getNumberWithLeadingZeros, textCleanup } from "../helpers.js";

const ModalImagePanel = ({ species, variant, showNumber }) => {
  // Get pokemon information for display on the card
  const number = getNumberWithLeadingZeros(
    species.pokedex_numbers[0].entry_number,
    3
  );
  const name = textCleanup(variant.name);
  const types = variant.types;
  const image = variant.sprites.other["official-artwork"].front_default;

  const primaryTypeClass = `${types[0].type.name}-type`;

  // If the pokemon has a second type, get the second type class for modal image panel background
  const secondaryTypeClass =
    types.length > 1 ? `${types[1].type.name}-secondary` : "";

  // If showNumber is true, render the number
  const numberClass = showNumber ? "pokemon-number" : "hidden";

  return (
    <div
      className={`modal-img-panel ${primaryTypeClass} ${secondaryTypeClass}`}
    >
      <span className={`${numberClass}`}>{number}</span>
      <img src={image} alt={name} />
      <h2 className="pokemon-name">{name}</h2>
    </div>
  );
};

export default ModalImagePanel;
