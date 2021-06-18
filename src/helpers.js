// Appends the leading zeros to the pokemon number
export function getNumberWithLeadingZeros(number, length) {
  let pokemonNumber = "" + number;
  while (pokemonNumber.length < length) {
    pokemonNumber = "0" + pokemonNumber;
  }
  return pokemonNumber;
}

// Clean up the text from the API (removes hyphens)
export function textCleanup(text) {
  if (text) {
    return text.toString().replace(/-/g, " ");
  }
}
