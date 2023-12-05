// Using regular expression to replace all occurrences of '-' with '_'
export function replaceDashesWithUnderscores(inputString) {
  return inputString.replace(/-/g, "_");
}

// Capitalize the first letter
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Shuffle the element in an array
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
