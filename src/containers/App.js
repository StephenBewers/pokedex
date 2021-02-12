import React, { Component } from "react";
import "./App.scss";
import PokemonCardList from "../components/PokemonCardList.js";
import InfiniteScroll from "react-infinite-scroll-component";

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
      count: 1,
      hasMore: true,
    };
  }

  getPokemon = () => {
    if (this.state.pokemons.length >= this.state.count) {
      this.setState({ hasMore: false });
      return;
    }
    try {
      (async () => {
        const interval = { offset: this.state.pokemons.length, limit: 40 };
        let response = await PokeApi.getPokemonsList(interval);
        this.setState({ count: response.count });
        let pokemonObjects = [];
        for (const item of response.results) {
          let pokemonObject = await PokeApi.resource(`${item.url}`);
          pokemonObjects.push(pokemonObject);
        }
        this.setState({ pokemons: this.state.pokemons.concat(pokemonObjects) });
      })();
    } catch {
      console.error(`Failed to get Pokemon list`);
    }
  };

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.pokemons.length}
        next={this.getPokemon}
        hasMore={this.state.hasMore}
      >
        <PokemonCardList pokemons={this.state.pokemons} />
      </InfiniteScroll>
    );
  }
}

export default App;
