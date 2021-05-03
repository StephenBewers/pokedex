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
const defaultTypeEffectiveness = 1;
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
    typesReceived: false,
    typeEffectiveness: {
      bug: defaultTypeEffectiveness,
      dark: defaultTypeEffectiveness,
      dragon: defaultTypeEffectiveness,
      electric: defaultTypeEffectiveness,
      fairy: defaultTypeEffectiveness,
      fighting: defaultTypeEffectiveness,
      fire: defaultTypeEffectiveness,
      flying: defaultTypeEffectiveness,
      ghost: defaultTypeEffectiveness,
      grass: defaultTypeEffectiveness,
      ground: defaultTypeEffectiveness,
      ice: defaultTypeEffectiveness,
      normal: defaultTypeEffectiveness,
      poison: defaultTypeEffectiveness,
      psychic: defaultTypeEffectiveness,
      rock: defaultTypeEffectiveness,
      steel: defaultTypeEffectiveness,
      water: defaultTypeEffectiveness,
    },
  };

  // Prevents clicks on the inner modal div triggering the outer modal click event
  innerModalClick(event) {
    event.stopPropagation();
  }

  componentDidMount() {
    this.getPokemonAbilityObjects(this.state.pokemon);
    this.getPokemonTypeObjects(this.state.pokemon);
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

  // Calculates the effectiveness of each type against this pokemon
  calculateTypeEffectiveness = (type, typeEffectiveness) => {
    // Calculate double damage types
    if (type.damage_relations.double_damage_from.length) {
      type.damage_relations.double_damage_from.forEach((doubleType) => {
        typeEffectiveness[doubleType.name] =
          typeEffectiveness[doubleType.name] * 2;
      });
    }

    // Calculate half damage types
    if (type.damage_relations.half_damage_from.length) {
      type.damage_relations.half_damage_from.forEach((halfType) => {
        typeEffectiveness[halfType.name] =
          typeEffectiveness[halfType.name] * 0.5;
      });
    }

    // Calculate no damage types
    if (type.damage_relations.no_damage_from.length) {
      type.damage_relations.no_damage_from.forEach((immuneType) => {
        typeEffectiveness[immuneType.name] =
          typeEffectiveness[immuneType.name] * 0;
      });
    }

    return typeEffectiveness;
  };

  // Gets the pokemon type objects from the API
  getPokemonTypeObjects = (pokemon) => {
    let { typeEffectiveness } = this.state;
    if (pokemon.defaultVariant.types.length) {
      try {
        (async () => {
          for (let i = 0; i < pokemon.defaultVariant.types.length; i++) {
            const typeObject = await PokeApi.resource(
              `${pokemon.defaultVariant.types[i].type.url}`
            );
            pokemon.defaultVariant.types[i].details = typeObject;
            typeEffectiveness = this.calculateTypeEffectiveness(
              typeObject,
              typeEffectiveness
            );
          }
          this.setState({
            pokemon: pokemon,
            typeEffectiveness: typeEffectiveness,
            typesReceived: true,
          });
        })();
      } catch {
        console.error(`Failed to get type object`);
      }
    }
  };

  render() {
    const { displayModal, hideModal, getNumberWithLeadingZeros } = this.props;

    const {
      pokemon,
      abilitiesReceived,
      typeEffectiveness,
      typesReceived,
    } = this.state;

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
    const displayAbilities = (abilities, abilitiesReceived) => {
      if (abilitiesReceived) {
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

    // If the abilities have been received, returns the JSX to display them
    const displayTypeEffectiveness = (
      types,
      effectDescription,
      typesReceived
    ) => {
      if (typesReceived) {
        let typeBtns = [];
        for (let i = 0; i < types.length; i++) {
          typeBtns.push(
            <PokemonTypeBtn
              type={types[i][0]}
              effect={types[i][1]}
              key={`${effectDescription}-type-btn-${i}`}
            ></PokemonTypeBtn>
          );
        }
        if (!typeBtns.length) {
          typeBtns.push(
            <PokemonTypeBtn
              type={"none"}
              key={`${effectDescription}-type-btn-0`}
            ></PokemonTypeBtn>
          );
        }
        return typeBtns;
      } else {
        return <span>Loading type effectiveness...</span>;
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
    let weakTypes = {};
    let normalTypes = {};
    let resistantTypes = {};
    let immuneTypes = {};

    // Get the weak, resistant and immune types
    if (typesReceived) {
      const typeEffectivenessArray = Object.entries(typeEffectiveness);
      weakTypes = typeEffectivenessArray
        .filter(([key, value]) => value > 1)
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
      normalTypes = typeEffectivenessArray.filter(
        ([key, value]) => value === 1
      );
      resistantTypes = typeEffectivenessArray
        .filter(([key, value]) => value < 1 && value !== 0)
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
      immuneTypes = typeEffectivenessArray.filter(
        ([key, value]) => value === 0
      );
    }

    return (
      <div className={`modal ${visibleClassName}`} onClick={hideModal}>
        <section className="modal-main" onClick={this.innerModalClick}>
          <ModalExitBtn hideModal={hideModal} />
          <ModalImagePanel
            pokemon={pokemon}
            getNumberWithLeadingZeros={getNumberWithLeadingZeros}
          />
          <div className="modal-info-panel">
            <PokemonDescription pokemon={pokemon} />
            <ModalRow id="modal-top-row">
              <ModalRow>
                <ModalInfoItem label="Types" id="modal-types" row={true}>
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
            <ModalRow id="modal-centre-section">
              <ModalColumn>
                <ModalRow>
                  <ModalInfoItem label="Abilities" id="modal-abilities">
                    {displayAbilities(abilities, abilitiesReceived)}
                  </ModalInfoItem>
                </ModalRow>
              </ModalColumn>
              <ModalColumn id="modal-right-column">
                <ModalRow>
                  <ModalInfoItem
                    label="Type effectiveness"
                    id="modal-type-effectiveness"
                  >
                    <p>
                      The effectiveness of move types on this pokémon in normal
                      battle conditions.
                    </p>
                    <ModalRow>
                      <ModalInfoItem
                        label="Weak to"
                        id="modal-types-weak"
                        subitem={true}
                        row={true}
                      >
                        {displayTypeEffectiveness(
                          weakTypes,
                          "weak",
                          typesReceived
                        )}
                      </ModalInfoItem>
                    </ModalRow>
                    <ModalRow>
                      <ModalInfoItem
                        label="Damaged normally by"
                        id="modal-types-normal"
                        subitem={true}
                        row={true}
                      >
                        {displayTypeEffectiveness(
                          normalTypes,
                          "normal",
                          typesReceived
                        )}
                      </ModalInfoItem>
                    </ModalRow>
                    <ModalRow>
                      <ModalInfoItem
                        label="Resistant to"
                        id="modal-types-resistant"
                        subitem={true}
                        row={true}
                      >
                        {displayTypeEffectiveness(
                          resistantTypes,
                          "resistant",
                          typesReceived
                        )}
                      </ModalInfoItem>
                    </ModalRow>
                    <ModalRow>
                      <ModalInfoItem
                        label="Immune to"
                        id="modal-types-immune"
                        subitem={true}
                        row={true}
                      >
                        {displayTypeEffectiveness(
                          immuneTypes,
                          "immune",
                          typesReceived
                        )}
                      </ModalInfoItem>
                    </ModalRow>
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
