import React from "react";
import "./PokemonAbility.scss";

const PokemonAbility = ({ ability }) => {

  // Gets the description of a pokemon ability
  const getAbilityDescription = (ability) => {
    const abilityDescriptionsArray = ability.details.effect_entries;
    let descriptionString = "";
    abilityDescriptionsArray.forEach((description) => {
      if (description.language.name === "en") {
        descriptionString = description.short_effect;
      }
    });
    return descriptionString;
  };

  const isHidden = (ability) => {
    if (ability.is_hidden) {
      return (
        <>
        &nbsp;<span className="hidden-ability-label">Hidden</span>
        </>
      )
    }
  }

  return (
    <details className={`pokemon-ability`}>
      <summary>{ability.ability.name}{isHidden(ability)}</summary>
      <p className={`pokemon-ability-description`}>{getAbilityDescription(ability)}</p>
    </details>
  );
};

export default PokemonAbility;