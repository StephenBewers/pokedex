import React from "react";
import "./SearchBox.scss";

const SearchBox = () => {
  return (
      <input
        className="pokemon-search-box"
        type="search"
        placeholder="Search pokémon"
      />
  );
};

export default SearchBox;
