import React, { Component } from "react";
import "./Modal.scss";
import PropTypes from "prop-types";
import ModalExitBtn from "./ModalExitBtn.js";
import ModalImagePanel from "./ModalImagePanel.js";
import ModalRow from "./ModalRow";
import ModalInfoItem from "./ModalInfoItem";
import ModalInfoValue from "./ModalInfoValue";
import ModalColumn from "./ModalColumn";
import PokemonDescription from "./PokemonDescription";
import PokemonTypeBtn from "./PokemonTypeBtn";
import PokemonAbility from "./PokemonAbility";

const Pokedex = require("pokeapi-js-wrapper");
const customOptions = {
  cacheImages: true,
};
const PokeApi = new Pokedex.Pokedex(customOptions);
class Modal extends Component {
  static propTypes = {
    displayModal: PropTypes.bool,
    pokemon: PropTypes.object.isRequired,
    hideModal: PropTypes.func,
    showModal: PropTypes.func,
    getNumberWithLeadingZeros: PropTypes.func,
  };
  state = {
    pokemon: this.props.pokemon,
    abilitiesReceived: false,
  };

  // Prevents clicks on the inner modal div triggering the outer modal click event
  innerModalClick(event) {
    event.stopPropagation();
  }

  componentDidMount() {
    this.getPokemonAbilityObjects(this.state.pokemon);
  }

  // Gets the pokemon ability objects from the API
  getPokemonAbilityObjects = (pokemon) => {
    if (pokemon.defaultVariant.abilities.length) {
      try {
        (async () => {
          for (let i = 0; i < pokemon.defaultVariant.abilities.length; i++) {
            const abilityObject = await PokeApi.resource(
              `${pokemon.defaultVariant.abilities[i].ability.url}`
            );
            pokemon.defaultVariant.abilities[i].details = abilityObject;
          }
          this.setState({
            pokemon: pokemon,
            abilitiesReceived: true,
          });
        })();
      } catch {
        console.error(`Failed to get ability object`);
      }
    }
  };

  render() {
    const { displayModal, hideModal, getNumberWithLeadingZeros } = this.props;

    const pokemon = this.state.pokemon;

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

    // If the abilities have been received, returns the JSX to display them
    const displayAbilities = () => {
      if (this.state.abilitiesReceived) {
        return (
          <>
            {abilities.map((ability, i) => {
              return (
                <PokemonAbility
                  ability={ability}
                  key={`ability-${i}`}
                ></PokemonAbility>
              );
            })}
          </>
        );
      } else {
        return <span>Loading abilities...</span>;
      }
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
    const abilities = pokemon.defaultVariant.abilities;

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
              <PokemonDescription pokemon={pokemon} />
            </ModalRow>
            <ModalRow>
              <ModalRow>
                <ModalInfoItem label="Types" id="modal-types">
                  {types.map((type, i) => {
                    return (
                      <PokemonTypeBtn
                        type={type.type.name}
                        key={`type-btn-${i}`}
                      ></PokemonTypeBtn>
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
                    value={`~ ${capturePercent}`}
                    unit="%"
                    alternative={true}
                  ></ModalInfoValue>
                </ModalInfoItem>
              </ModalRow>
            </ModalRow>
            <ModalRow>
              <ModalColumn>
                <ModalRow>
                  <ModalInfoItem
                    label="Abilities"
                    id="modal-abilities"
                  >
                    {displayAbilities()}
                  </ModalInfoItem>
                </ModalRow>
              </ModalColumn>
            </ModalRow>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
