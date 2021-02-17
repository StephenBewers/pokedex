import React from "react";
import "./Header.scss";
import SearchBox from "../components/SearchBox.js";

const Header = ({stickyHeader}) => {

    let className = (stickyHeader) ? "sticky" : "";

    return (
      <header className={className}></header>
    );
  }

export default Header;
