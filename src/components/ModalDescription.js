import React from "react";
import "./ModalDescription.scss";

const ModalDescription = ({ pokemon }) => {
  // Gets the Omega-Ruby description in English
  const getDescriptionText = (descriptionsArray) => {
    let descriptionString = "";
    descriptionsArray.forEach((description) => {
      if (
        description.language.name === "en" &&
        description.version.name === "omega-ruby"
      ) {
        descriptionString = description.flavor_text;
      }
    });
    return descriptionString;
  };

  const description = getDescriptionText(pokemon.flavor_text_entries);

  return <div id="modal-description">{description}</div>;
};

export default ModalDescription;
