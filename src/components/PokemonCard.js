import { React } from "react";
import Tilt from "react-parallax-tilt";
import "./PokemonCard.scss";

const PokemonCard = ({ number, name, type, image }) => {
  const typeImages = {
    grass:
      "https://pm1.narvii.com/7243/0b36782d158f6da0639e38ebf94af3d5c37288c2r1-668-486v2_hq.jpg",
    fire:
      "https://pm1.narvii.com/7243/8ee17e7a8790303410b30a2fbcb18183fc12166er1-623-499v2_hq.jpg",
    water:
      "https://pm1.narvii.com/7243/46d5cfd672a1e2fca16c78d728e2b10cb57f7ce0r1-669-521v2_hq.jpg",
  };

  const getTypeImage = (type) => {
    if (type.length && typeImages[type] !== undefined) {
      return typeImages[type];
    } else {
      return "https://pm1.narvii.com/7243/f2fb9db8191078f72c8b98fee93155c56e6e8674r1-673-421v2_hq.jpg";
    }
  }

  return (
    <Tilt
      className="pokemon-card"
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
      style={{ backgroundImage: `url(${getTypeImage(type)})` }}
    >
      <span className="pokemon-number">{number}</span>
      <img className="pokemon-img" src={`${image}`} alt={`${name}`} />
      <span className="pokemon-name">{name}</span>
    </Tilt>
  );
};

export default PokemonCard;
