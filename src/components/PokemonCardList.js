import React, { Component } from "react";
import "./PokemonCardList.scss";
import Modal from "./Modal";
import PokemonCard from "./PokemonCard";

class PokemonCardList extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getNumberWithLeadingZeros = this.getNumberWithLeadingZeros.bind(this);
    this.state = {
      displayModal: false,
      modalPokemon: "",
    };
  }

  // Appends the leading zeros to the pokemon number
  getNumberWithLeadingZeros = (number, length) => {
    let pokemonNumber = "" + number;
    while (pokemonNumber.length < length) {
      pokemonNumber = "0" + pokemonNumber;
    }
    return pokemonNumber;
  };

  // Determines if the modal should be rendered or not
  renderModal = () => {
    if (this.state.displayModal) {
      return (
        <Modal
          displayModal={this.state.displayModal}
          pokemon={this.state.modalPokemon}
          hideModal={this.hideModal}
          showModal={this.showModal}
          getNumberWithLeadingZeros={this.getNumberWithLeadingZeros}
        />
      );
    }
  };

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
        {this.renderModal()}
        <div className="card-list">
          {this.props.pokemonList.map((pokemon, i) => {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                clickHandler={this.showModal}
                getNumberWithLeadingZeros={this.getNumberWithLeadingZeros}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default PokemonCardList;
