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
            number={pokemon.pokedex_numbers[0].entry_number}
            name={pokemon.name}
            type={pokemon.defaultVariant.types[0].type.name}
            image={pokemon.defaultVariant.sprites.other["official-artwork"].front_default}
          />
        );
      })}
    </div>
  );
};

export default PokemonCardList;
