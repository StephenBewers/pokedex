import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ additionalClass }) => {
  return (
    <input
      className={`search-bar ${additionalClass}`}
      type="search"
      placeholder="Search pokémon"
    />
  );
};

export default SearchBar;
