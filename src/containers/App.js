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
    this.resetPokemon = this.resetPokemon.bind(this);
    this.getSpecificPokemon = this.getSpecificPokemon.bind(this);
    this.state = {
      pokemonNames: [],
      retrievedPokemon: [],
      retrievalLimit: 24,
      count: 1,
      hasMore: true,
      stickySearch: false,
    };
  }

  // Gets a list of all available pokemon names
  getPokemonNames = () => {
    // The starting point and number of pokemon to retrieve from the API per request
    const interval = { offset: 0, limit: 2000 };

    try {
      (async () => {
        // Gets the list of pokemon requested
        let response = await PokeApi.getPokemonSpeciesList(interval);

        // Store the total number of pokemon available from the API in state
        this.setState({ count: response.count });

        // Store all of the pokemon names in an array and add to state
        let pokemonNames = [];
        for (const item of response.results) {
          pokemonNames.push(item.name);
        }
        this.setState({ pokemonNames: pokemonNames });
      })();
    } catch {
      console.error(`Failed to get Pokemon names`);
    }
  };

  // Retrieves the pokemon objects from the API from the total already retrieved (pass 0 to reset)
  getPokemon = (totalAlreadyRetrieved) => {
    let { retrievedPokemon, retrievalLimit } = this.state;

    // Compares the number of pokemon already in state to the total available from the API
    if (retrievedPokemon.length >= this.state.count) {
      // If there are no more to retrieve, set the hasMore flag to false
      this.setState({ hasMore: false });
      return;
    } else {
      this.setState({ hasMore: true });
    }
    try {
      (async () => {
        // The starting point and number of pokemon to retrieve from the API per request
        const interval = {
          offset: totalAlreadyRetrieved,
          limit: retrievalLimit,
        };

        // Gets the list of pokemon requested and the API URL for their information
        let response = await PokeApi.getPokemonSpeciesList(interval);

        // For each pokemon in the response, retrieve their information from the API
        let pokemonObjects = [];
        for (const item of response.results) {
          // Get the pokemon species from the API
          let pokemonSpecies = await PokeApi.resource(`${item.url}`);

          // Get the data for the default variant of the species and store it in the object
          pokemonSpecies.defaultVariant = await PokeApi.resource(
            `${pokemonSpecies.varieties[0].pokemon.url}`
          );

          // Add the pokemon object to the array of pokemon objects retrieved in this request
          pokemonObjects.push(pokemonSpecies);
        }

        // If there are fewer pokemon in state than would be returned by one call, replace the state with
        // the pokemon objects retrieved in this request
        if (totalAlreadyRetrieved < 1) {
          this.setState({
            retrievedPokemon: pokemonObjects,
          });
        } else {
          // If not, add the array of pokemon objects retrieved in this request to the pokemon objects already in state
          this.setState({
            retrievedPokemon: retrievedPokemon.concat(pokemonObjects),
          });
        }
      })();
    } catch {
      console.error(`Failed to get Pokemon list`);
    }
  };

  // Retrieves a single pokemon from the API
  getSpecificPokemon = (pokemonToGet) => {
    try {
      (async () => {
        let pokemonObjects = [];

        for (const pokemon of pokemonToGet) {
          // Get the pokemon species from the API
          let pokemonSpecies = await PokeApi.getPokemonSpeciesByName(pokemon);

          // Get the data for the default variant of the species and store it in the object
          pokemonSpecies.defaultVariant = await PokeApi.resource(
            `${pokemonSpecies.varieties[0].pokemon.url}`
          );

          // Add the pokemon object to the array of pokemon objects retrieved in this request
          pokemonObjects.push(pokemonSpecies);
        }

        // Change state to the pokemon objects retrieved
        this.setState({
          retrievedPokemon: pokemonObjects,
          hasMore: false,
        });
      })();
    } catch {
      console.error(`Unable to retrieve specified pokemon`);
    }
  };

  // Retrieves the next batch of pokemon for the infinite scroll
  getMorePokemon = () => this.getPokemon(this.state.retrievedPokemon.length);

  // Resets the UI before loading the pokemon
  resetPokemon = () => {
    this.setState({
      retrievedPokemon: [],
    }, this.getPokemon(0));
  }

  componentDidMount() {
    // If the pokemon names list is empty, get the pokemon names
    if (!this.state.pokemonNames.length) {
      this.getPokemonNames();
    }

    // Retrieve the pokemon
    this.getMorePokemon();

    // Get the viewport height and width, and calculate the minimum
    const viewportHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const viewportMin = Math.min(viewportHeight, viewportWidth);

    // Calculate the point for the search bar to stick
    let stickySearchPosition = Math.min(viewportMin * 0.4);

    // Checks if the user has scrolled past the sticky position
    const checkStickyPosition = () => {
      // If we pass the sticky position, make the search bar stick
      if (window.scrollY >= stickySearchPosition) {
        if (!this.state.stickySearch) {
          this.setState({ stickySearch: true });
        }
      } else {
        if (this.state.stickySearch) {
          this.setState({ stickySearch: false });
        }
      }
    };

    // Listen for scrolling and/or mouse wheeling
    window.addEventListener("scroll", checkStickyPosition, {
      passive: true,
    });
    window.addEventListener("wheel", checkStickyPosition, {
      passive: true,
    });
  }

  render() {
    const {
      pokemonNames,
      retrievedPokemon,
      hasMore,
      stickySearch,
    } = this.state;
    return (
      <>
        <Header
          key={stickySearch}
          stickySearch={stickySearch}
          searchOptions={pokemonNames}
          resetPokemon={this.resetPokemon}
          getSpecificPokemon={this.getSpecificPokemon}
        ></Header>
        <main>
          <InfiniteScroll
            dataLength={retrievedPokemon.length}
            next={this.getMorePokemon}
            hasMore={hasMore}
            loader={
              <div className="loading-bar">
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            }
          >
            <PokemonCardList pokemonList={retrievedPokemon} />
          </InfiniteScroll>
        </main>
      </>
    );
  }
}

export default App;
