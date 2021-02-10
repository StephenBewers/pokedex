import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonCardList = ({ pokemons }) => {
  return (
    <div className="container">
      {pokemons.map((pokemon, i) => {
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
