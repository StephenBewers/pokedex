import React, { Component } from "react";
import "./App.scss";
import PokemonCardList from "../components/PokemonCardList.js";

const Pokedex = require("pokeapi-js-wrapper");
const customOptions = {
  cacheImages: true,
};
const PokeApi = new Pokedex.Pokedex(customOptions);
class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
    };
  }

  componentDidMount() {
    try {
      (async () => {
        const interval = { limit: 151 };
        let response = await PokeApi.getPokemonsList(interval);
        let pokemonObjects = [];
        for (const item of response.results) {
          let pokemonObject = await PokeApi.resource(`${item.url}`);
          pokemonObjects.push(pokemonObject);
        }
        this.setState({ pokemons: pokemonObjects });
      })();
    } catch {
      console.error(`Failed to get Pokemon list`);
    }
  }

  render() {
    return <PokemonCardList pokemons={this.state.pokemons} />;
  }
}

export default App;
