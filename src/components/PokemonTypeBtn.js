import React from "react";
import "./PokemonTypeBtn.scss";
import bugIcon from "../assets/images/bug-icon.png";
import darkIcon from "../assets/images/dark-icon.png";
import dragonIcon from "../assets/images/dragon-icon.png";
import electricIcon from "../assets/images/electric-icon.png";
import fairyIcon from "../assets/images/fairy-icon.png";
import fightingIcon from "../assets/images/fighting-icon.png";
import fireIcon from "../assets/images/fire-icon.png";
import flyingIcon from "../assets/images/flying-icon.png";
import ghostIcon from "../assets/images/ghost-icon.png";
import grassIcon from "../assets/images/grass-icon.png";
import groundIcon from "../assets/images/ground-icon.png";
import iceIcon from "../assets/images/ice-icon.png";
import normalIcon from "../assets/images/normal-icon.png";
import poisonIcon from "../assets/images/poison-icon.png";
import psychicIcon from "../assets/images/psychic-icon.png";
import rockIcon from "../assets/images/rock-icon.png";
import steelIcon from "../assets/images/steel-icon.png";
import waterIcon from "../assets/images/water-icon.png";

const PokemonTypeBtn = ({ type, modifier }) => {
  const getTypeIcon = (type) => {
    const typeIcons = {
      bug: bugIcon,
      dark: darkIcon,
      dragon: dragonIcon,
      electric: electricIcon,
      fairy: fairyIcon,
      fighting: fightingIcon,
      fire: fireIcon,
      flying: flyingIcon,
      ghost: ghostIcon,
      grass: grassIcon,
      ground: groundIcon,
      ice: iceIcon,
      normal: normalIcon,
      poison: poisonIcon,
      psychic: psychicIcon,
      rock: rockIcon,
      steel: steelIcon,
      water: waterIcon,
    };
    return typeIcons[type] || typeIcons["normal"];
  };

  const typeIcon = getTypeIcon(type);

  return (
    <span className={`pokemon-type-btn ${type}-btn`}>
      <img src={`${typeIcon}`} alt=""></img> {type}
    </span>
  );
};

export default PokemonTypeBtn;
