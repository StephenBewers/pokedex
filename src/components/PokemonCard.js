import { React } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

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
    <Col>
      <Card className="pokemon-card">
        <Card.Img src={`${typeImage}`} alt={`${type} background`} />
        <Card.ImgOverlay>
          <Card.Text>{number}</Card.Text>
          <Image src={`${image}`} alt={`${name}`} fluid />
          <Card.Title>{name}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
};

export default PokemonCard;
