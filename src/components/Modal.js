import React, { Component } from "react";
import "./Modal.scss";
import PropTypes from "prop-types";
import ModalExitBtn from "./ModalExitBtn.js";
import ModalImagePanel from "./ModalImagePanel.js";
import TypeBtn from "./TypeBtn";
import ModalRow from "./ModalRow";
import ModalDescription from "./ModalDescription";
import ModalInfoItem from "./ModalInfoItem";
import ModalInfoValue from "./ModalInfoValue";

class Modal extends Component {
  static propTypes = {
    displayModal: PropTypes.bool,
    pokemon: PropTypes.object.isRequired,
    hideModal: PropTypes.func,
    showModal: PropTypes.func,
    getNumberWithLeadingZeros: PropTypes.func,
  };

  // Prevents clicks on the inner modal div triggering the outer modal click event
  innerModalClick(event) {
    event.stopPropagation();
  }

  render() {
    const {
      displayModal,
      pokemon,
      hideModal,
      getNumberWithLeadingZeros,
    } = this.props;

    // If the displayModal state becomes false, hide the modal
    const visibleClassName = displayModal ? "visible" : "hidden";

    // Gets the pokemon height in metres
    const getHeightInMetres = (height) => {
      return height / 10;
    };

    // Gets the pokemon height in feet
    const getHeightInFeet = (height) => {
      return getHeightInMetres(height) * 3.28084;
    };

    // Gets the remaining inches from the pokemon height in feet
    const getHeightRemainingInches = (height) => {
      return (getHeightInMetres(height) % 1) * 12;
    };

    // Gets the pokemon weight in kilograms
    const getWeightInKilograms = (weight) => {
      return weight / 10;
    };

    // Gets the pokemon weight in pounds
    const getWeightInPounds = (weight) => {
      return (getWeightInKilograms(weight) * 2.205).toFixed(1);
    };

    // Get catch rate as a percentage
    const getCapturePercent = (captureRate) => {
      return ((captureRate / 255) * 100).toFixed(2);
    };

    // Get pokemon information for display on the modal
    const types = pokemon.defaultVariant.types;
    const habitat = pokemon.habitat?.name;
    const height = pokemon.defaultVariant.height;
    const heightInMetres = getHeightInMetres(height);
    const heightInFeetInches = `${parseInt(
      getHeightInFeet(height)
    )}' ${parseInt(getHeightRemainingInches(height))}"`;
    const weight = pokemon.defaultVariant.weight;
    const weightInKilos = getWeightInKilograms(weight);
    const weightInPounds = getWeightInPounds(weight);
    const captureRate = pokemon.capture_rate;
    const capturePercent = getCapturePercent(captureRate);

    getHeightInMetres(height);

    return (
      <div className={`modal ${visibleClassName}`} onClick={hideModal}>
        <section className="modal-main" onClick={this.innerModalClick}>
          <ModalExitBtn hideModal={hideModal} />
          <ModalImagePanel
            pokemon={pokemon}
            getNumberWithLeadingZeros={getNumberWithLeadingZeros}
          />
          <div className="modal-info-panel">
            <ModalRow>
              <ModalDescription pokemon={pokemon} />
            </ModalRow>
            <ModalRow>
              <ModalRow>
                <ModalInfoItem label="Types" id="modal-types">
                  {types.map((type, i) => {
                    return (
                      <TypeBtn
                        type={type.type.name}
                        key={`type-btn-${i}`}
                      ></TypeBtn>
                    );
                  })}
                </ModalInfoItem>
                <ModalInfoItem label="Habitat" id="modal-habitat">
                  <ModalInfoValue value={habitat}></ModalInfoValue>
                </ModalInfoItem>
              </ModalRow>
              <ModalRow>
                <ModalInfoItem label="Height" id="modal-height">
                  <ModalInfoValue
                    value={heightInMetres}
                    unit="m"
                  ></ModalInfoValue>
                  <ModalInfoValue
                    value={heightInFeetInches}
                    unit="ft/in"
                    alternative={true}
                  ></ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem label="Weight" id="modal-weight">
                  <ModalInfoValue
                    value={weightInKilos}
                    unit="kg"
                  ></ModalInfoValue>
                  <ModalInfoValue
                    value={weightInPounds}
                    unit="lb"
                    alternative={true}
                  ></ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem label="Catch rate" id="modal-catch-rate">
                  <ModalInfoValue value={captureRate}></ModalInfoValue>
                  <ModalInfoValue
                    value={capturePercent}
                    unit="%"
                    alternative={true}
                  ></ModalInfoValue>
                </ModalInfoItem>
              </ModalRow>
            </ModalRow>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
