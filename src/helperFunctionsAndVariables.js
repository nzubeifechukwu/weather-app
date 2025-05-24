const form = document.querySelector("form");
const input = document.querySelector("input");
const section = document.querySelector("section");

function capitalizeWord(word) {
  return word.replace(word[0], word[0].toUpperCase());
}

function fahrenheitToCelsius(temperature) {
  return (((temperature - 32) * 5) / 9).toFixed(1);
}

export { capitalizeWord, fahrenheitToCelsius, form, input, section };
