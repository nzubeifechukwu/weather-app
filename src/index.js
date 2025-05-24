import { getWeather } from "./getWeather";
import {
  capitalizeWord,
  fahrenheitToCelsius,
  form,
  input,
  section,
} from "./helperFunctionsAndVariables";
import "./styles.css";

form.addEventListener("submit", (event) => {
  section.innerText = "";
  event.preventDefault();
  if (input.value.trim()) {
    getWeather(input.value.trim()).then((locationData) => {
      if (!locationData) {
        const h3 = document.createElement("h3");
        h3.innerText = `There seems to be no data available for ${capitalizeWord(
          input.value.trim().toLowerCase()
        )}`;
        section.appendChild(h3);
      } else {
        section.innerHTML = `
            <h3>Current weather details for ${locationData.location}</h3>
            <div id="temp">
              <p><strong>Temperature:</strong> ${locationData.temperature} °F</p>
              <button type="button">To °C</button>
            </div>
            <p><strong>Humidity:</strong> ${locationData.humidity}</p>
            <p><strong>Short description:</strong> ${locationData.description}</p>
            <p><strong>Timezone:</strong> ${locationData.timezone}</p>
          `;
        const tempButton = document.querySelector("div button");
        const tempPara = document.querySelector("div p");
        tempButton.addEventListener("click", () => {
          if (tempButton.textContent.includes("C")) {
            tempPara.innerHTML = `<strong>Temperature:</strong> ${fahrenheitToCelsius(
              locationData.temperature
            )} °C`;
            tempButton.textContent = "To °F";
          } else {
            tempPara.innerHTML = `<strong>Temperature:</strong> ${locationData.temperature} °F`;
            tempButton.textContent = "To °C";
          }
        });
      }
    });
  }
});
