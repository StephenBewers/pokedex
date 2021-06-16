import React from "react";
import "./PokemonAbility.scss";

const PokemonAbility = ({ ability, detailsReceived, textCleanup }) => {
  // If the description of the ability has been received, return it
  const getAbilityDescription = (ability, detailsReceived) => {
    if (detailsReceived) {
      const abilityDescriptionsArray = ability.details.effect_entries;
      let descriptionString = "";
      abilityDescriptionsArray.forEach((description) => {
        if (description.language.name === "en") {
          descriptionString = description.short_effect;
        }
      });
      return descriptionString;
    }
    // If the description of the ability hasn't been received, return a holding message
    else {
      return "Loading ability description..."
    }
  };

  const isHidden = (ability) => {
    if (ability.is_hidden) {
      return (
        <>
          &nbsp;<span className="hidden-ability-label">Hidden</span>
        </>
      );
    }
  };

  return (
    <details className={`pokemon-ability`}>
      <summary>
        {textCleanup(ability.ability.name)}
        {isHidden(ability)}
      </summary>
      <p className={`pokemon-ability-description`}>
        {getAbilityDescription(ability, detailsReceived)}
      </p>
    </details>
  );
};

export default PokemonAbility;
