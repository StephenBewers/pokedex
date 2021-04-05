import React, { Component } from "react";
import "./Modal.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Modal extends Component {
  static propTypes = {
    displayModal: PropTypes.func,
    pokemon: PropTypes.object.isRequired,
    hideModal: PropTypes.func,
    showModal: PropTypes.func,
    getNumberWithLeadingZeros: PropTypes.func,
  };

  render() {
    const {
      displayModal,
      pokemon,
      hideModal,
      getNumberWithLeadingZeros,
    } = this.props;

    // If the displayModal state becomes false, hide the modal
    const visibleClassName = displayModal ? "visible" : "hidden";

    // Get pokemon information for display on the modal
    const number = pokemon.pokedex_numbers[0].entry_number;
    const name = pokemon.name;
    const types = pokemon.defaultVariant.types;
    const image =
      pokemon.defaultVariant.sprites.other["official-artwork"].front_default;

    // Type class for modal image panel background
    const primaryTypeClass = `${types[0].type.name}-type`;

    // If the pokemon has a second type, get the second type class for modal image panel background
    const secondaryTypeClass =
      types.length > 1 ? `${types[1].type.name}-secondary` : "";

    return (
      <div className={`modal ${visibleClassName}`} onClick={hideModal}>
        <section className="modal-main">
          <div className="btn-modal-exit" role="button" onClick={hideModal}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div
            className={`modal-img-panel ${primaryTypeClass} ${secondaryTypeClass}`}
          >
            <span className="modal-number">
              {getNumberWithLeadingZeros(number, 3)}
            </span>
            <img className="modal-img" src={image} alt={name} />
            <h2>{name}</h2>
          </div>
          <div className="modal-info-panel"></div>
        </section>
      </div>
    );
  }
}

export default Modal;
