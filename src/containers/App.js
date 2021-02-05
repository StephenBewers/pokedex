import React, { Component } from "react";
import "./App.scss";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import PokemonCard from "../components/PokemonCard.js";

class App extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
              <PokemonCard
                id="1"
                number="001"
                name="Bulbasaur"
                type="grass"
                image="https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png"
              />
              <PokemonCard
                id="2"
                number="004"
                name="Charmander"
                type="fire"
                image="https://cdn.bulbagarden.net/upload/7/73/004Charmander.png"
              />
              <PokemonCard
                id="3"
                number="007"
                name="Squirtle"
                type="water"
                image="https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png"
              />
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
