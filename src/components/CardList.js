import React, { Component } from "react";
import "./CardList.scss";
import Modal from "./Modal";
import PokemonCard from "./PokemonCard";

class CardList extends Component {
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

  // TODO: Move rendering Modal logic to App.js so that a Modal doesn't load within another Modal

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
          species={this.state.modalPokemon.species}
          variant={this.state.modalPokemon.variant}
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

  // Determines the class to use for the card list
  cardListClass = this.props.modal ? "modal-card-list" : "card-list";

  render() {
    return (
      <>
        {this.renderModal()}
        <div className={this.cardListClass}>
          {this.props.pokemonList.map((pokemon, i) => {
            return (
              <PokemonCard
                key={i}
                species={pokemon.species}
                variant={pokemon.variant}
                showNumber={this.props.showNumber}
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

export default CardList;
