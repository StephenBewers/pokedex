import React from "react";
import "./PokemonCardList.scss";
import PokemonCard from "./PokemonCard";

const PokemonCardList = ({ pokemonList }) => {

  return (
    <div className="card-list">
      {pokemonList.map((pokemon, i) => {
        return (
          <PokemonCard
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            type={pokemon.types[0].type.name}
            image={pokemon.sprites.other["official-artwork"].front_default}
          />
        );
      })}
    </div>
  );
};

export default PokemonCardList;
