import React, { Component } from "react";
import "./SearchBar.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
    additionalClass: PropTypes.string,
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  };

  // When the text in the search bar changes, filter the list of pokemon and display the suggestions
  onChange = (event) => {
    const { options } = this.props;
    const userInput = event.currentTarget.value;
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput,
    });
  };

  // When the user selects one of the autocomplete suggestions, populate the search box with
  // the selected pokemon name and stop displaying suggestions
  onClick = (event) => {
    this.setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      userInput: event.currentTarget.innerText,
    });
  };

  // Handle key events
  onKeyDown = (event) => {
    const { activeOption, filteredOptions } = this.state;

    // Return key provides the same action as the click event
    if (event.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showSuggestions: false,
        userInput: filteredOptions[activeOption],
      });
    }

    // Up arrow selects the suggestion above the currently selected option if not already at the top
    else if (event.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    }

    // Down arrow selects the suggestion below the currently selected option if not already at the bottom
    else if (event.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  // Lists the options provided in JSX format for rendering
  listOptions = (optionName, index) => {
    let className = "option";
    if (index === this.state.activeOption) {
      className = "option-active";
    }
    return (
      <li className={className} key={optionName} onClick={this.onClick}>
        {optionName}
      </li>
    );
  };

  render() {
    const {
      onChange,
      onKeyDown,
      listOptions,
      props: { additionalClass },
      state: { filteredOptions, showOptions, userInput },
    } = this;

    // Provide the JSX code for the suggestions list
    let optionList;
    if (showOptions && userInput) {
      // JSX if there are matching pokemon names in the list
      if (filteredOptions.length) {
        // If there are more than 5 options, only return the first 5
        if (filteredOptions.length > 5) {
          optionList = (
            <ul className="options">
              {filteredOptions.slice(0, 5).map(listOptions)}
            </ul>
          );
        }

        // If there are 5 or fewer options, return all
        else {
          optionList = (
            <ul className="options">{filteredOptions.map(listOptions)}</ul>
          );
        }
      }

      // JSX if there are no matching pokemon names in the list
      else {
        optionList = (
          <div className="no-results">
            <em>No pokémon found!</em>
          </div>
        );
      }
    }

    return (
      <div className={`search-container ${additionalClass}`}>
        <div className={`search-bar`}>
          <input
            type="search"
            placeholder="Search pokémon"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button type="submit" value="" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {optionList}
      </div>
    );
  }
}

export default SearchBar;
