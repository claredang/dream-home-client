export default function replaceDashesWithUnderscores(inputString) {
  // Using regular expression to replace all occurrences of '-' with '_'
  return inputString.replace(/-/g, "_");
}
