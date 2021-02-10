import { React } from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";

const PokemonCard = ({ number, name, type, image }) => {
  let typeImage = "";
  switch (type) {
    case "grass":
      typeImage =
        "https://pm1.narvii.com/7243/0b36782d158f6da0639e38ebf94af3d5c37288c2r1-668-486v2_hq.jpg";
      break;
    case "fire":
      typeImage =
        "https://pm1.narvii.com/7243/8ee17e7a8790303410b30a2fbcb18183fc12166er1-623-499v2_hq.jpg";
      break;
    case "water":
      typeImage =
        "https://pm1.narvii.com/7243/46d5cfd672a1e2fca16c78d728e2b10cb57f7ce0r1-669-521v2_hq.jpg";
      break;
    default:
      typeImage = "holder.js/100px270";
      break;
  }
  return (
    <Tilt
      className="pokemon-card"
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
      style={{ backgroundImage: `url(${typeImage})` }}
    >
      <span className="pokemon-number">{number}</span>
      <img className="pokemon-img" src={`${image}`} alt={`${name}`} />
      <span className="pokemon-name">{name}</span>
    </Tilt>
  );
};

export default PokemonCard;
