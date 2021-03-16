import React, { Component } from "react";
import "./SearchBar.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
    additionalClass: PropTypes.string,
    resetPokemon: PropTypes.func,
    getSpecificPokemon: PropTypes.func,
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    defaultView: true,
    userInput: "",
  };

  filterOptions = (options, userInput) => {
    // Get the pokemon that begin with the user input string
    const optionsStartingWithUserInput = options.filter((option) =>
      option.toLowerCase().startsWith(userInput.toLowerCase())
    );

    // Get the pokemon that contain the user input string
    const optionsContainingUserInput = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Return the filtered options with those starting with the user input first
    return optionsStartingWithUserInput.concat(
      optionsContainingUserInput.filter(
        (option) => optionsStartingWithUserInput.indexOf(option) < 0
      )
    );
  };

  // Resets the view to display all pokemon with no autocomplete options displayed
  resetView = () => {
    if (!this.state.defaultView) {
      this.props.resetPokemon();
    }
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      defaultView: true,
      userInput: "",
    });
  };

  // When the text in the search bar changes, filter the list of pokemon and display the suggestions
  onChange = (event) => {
    const { options } = this.props;
    const userInput = event.currentTarget.value;
    if (userInput.length) {
      const filteredOptions = this.filterOptions(options, userInput);
      this.setState({
        activeOption: 0,
        filteredOptions,
        showOptions: true,
        userInput,
      });
    }
    // If user input has been cleared, reset the view
    else {
      this.resetView();
    }
  };

  // When the user selects one of the autocomplete suggestions, populate the search box with
  // the selected pokemon name, load that pokemon card, and stop displaying suggestions
  onClick = (event) => {
    this.setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      defaultView: false,
      userInput: event.currentTarget.innerText,
    });
    this.props.getSpecificPokemon([
      event.currentTarget.innerText.toLowerCase(),
    ]);
  };

  // Handle key events for autocomplete suggestion list
  onKeyDown = (event) => {
    const { activeOption, filteredOptions } = this.state;

    // Return key provides the same action as the click event
    if (event.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        defaultView: false,
        userInput: filteredOptions[activeOption],
      });
      this.props.getSpecificPokemon([
        filteredOptions[activeOption].toLowerCase(),
      ]);
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

    // Esc key resets the view
    if (event.keyCode === 27) {
      this.resetView();
    }
  };

  // Lists the autocomplete options provided in JSX format for rendering
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

    // Provide the JSX code for the autocomplete suggestions list
    let optionList;
    if (showOptions && userInput) {
      // JSX if there are matching pokemon names in the list
      if (filteredOptions.length) {
        // If there are more than 5 options, only return the first 5
        if (filteredOptions.length > 5) {
          optionList = (
            <div className="options-container">
              <ul className="options">
                {filteredOptions.slice(0, 5).map(listOptions)}
              </ul>
            </div>
          );
        }

        // If there are 5 or fewer options, return all
        else {
          optionList = (
            <div className="options-container">
              <ul className="options">{filteredOptions.map(listOptions)}</ul>
            </div>
          );
        }
      }

      // JSX if there are no matching pokemon names in the list
      else {
        optionList = (
          <div className="options-container">
            <p className="no-results">
              <em>No pokémon found with that name!</em>
            </p>
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
