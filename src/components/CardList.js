import React from "react";
import "./CardList.scss";
import PokemonCard from "./PokemonCard";

const CardList = ({ pokemonList, modal, showNumber, clickHandler }) => {
  // Determines the class to use for the card list
  const cardListClass = modal ? "modal-card-list" : "card-list";

  return (
    <>
      <div className={cardListClass}>
        {pokemonList.map((pokemon, i) => {
          return (
            <PokemonCard
              key={i}
              species={pokemon.species}
              variant={pokemon.variant}
              showNumber={showNumber}
              modalCard={modal}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
