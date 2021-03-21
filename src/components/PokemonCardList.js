import React, { Component } from "react";
import "./PokemonCardList.scss";
import Modal from "./Modal";
import PokemonCard from "./PokemonCard";

class PokemonCardList extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      displayModal: false,
      modalPokemon: "",
    };
  }

  // Displays the modal with the pokemon information
  showModal = (pokemon) => {
    this.setState({
      displayModal: true,
      modalPokemon: pokemon,
    });
  };

  // Hides the modal with the pokemon information
  hideModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    return (
      <>
        <Modal
          displayModal={this.state.displayModal}
          pokemon={this.state.modalPokemon}
          hideModal={this.hideModal}
          showModal={this.showModal}
        />
        <div className="card-list">
          {this.props.pokemonList.map((pokemon, i) => {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                clickHandler={this.showModal}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default PokemonCardList;
