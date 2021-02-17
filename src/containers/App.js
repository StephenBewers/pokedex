import React, { Component } from "react";
import "./App.scss";
import Header from "../components/Header.js";
import InfiniteScroll from "react-infinite-scroll-component";
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
      count: 1,
      hasMore: true,
      stickyHeader: false,
    };
  }

  // Retrieves the pokemon objects from the API
  getPokemon = () => {
    // Compares the number of pokemon already in state to the total available from the API
    if (this.state.pokemons.length >= this.state.count) {
      // If there are no more to retrieve, set the hasMore flag to false
      this.setState({ hasMore: false });
      return;
    }
    try {
      (async () => {
        // The starting point and number of pokemon to retrieve from the API per request
        const interval = { offset: this.state.pokemons.length, limit: 30 };

        // Gets the list of pokemon requested and the API URL for their information
        let response = await PokeApi.getPokemonsList(interval);

        // Retrieves the total number of pokemon available from the API
        this.setState({ count: response.count });

        // For each pokemon in the response, retrieve their information from the API and store it in an array of pokemon objects
        let pokemonObjects = [];
        for (const item of response.results) {
          let pokemonObject = await PokeApi.resource(`${item.url}`);
          pokemonObjects.push(pokemonObject);
        }

        // Add the array of pokemon objects retrieved in this request to the pokemon objects already in state
        this.setState({ pokemons: this.state.pokemons.concat(pokemonObjects) });
      })();
    } catch {
      console.error(`Failed to get Pokemon list`);
    }
  };

  componentDidMount() {
    // Retrieve the pokemon
    this.getPokemon();

    // Listen for scrolling
    window.addEventListener("scroll", () => {

      // Get the viewport height and use it to calculate the point we want the header to stick
      const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      let stickyPosition = Math.min(viewportHeight * 0.6);
      if (window.pageYOffset >= stickyPosition) {
        this.setState({ stickyHeader: true });
      } else {
        this.setState({ stickyHeader: false });
      }
    });
  }

  render() {
    return (
      <>
        <Header stickyHeader={this.state.stickyHeader}></Header>
        <main>
          <InfiniteScroll
            dataLength={this.state.pokemons.length}
            next={this.getPokemon}
            hasMore={this.state.hasMore}
          >
            <PokemonCardList pokemons={this.state.pokemons} stickyHeader={this.state.stickyHeader} />
          </InfiniteScroll>
        </main>
      </>
    );
  }
}

export default App;
