const textbox = document.getElementById("textbox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result");
const gaugeFill = document.getElementById("gaugeFill");
const glowOrb = document.getElementById("glowOrb");
const copyTooltip = document.getElementById("copyTooltip");

let temp;

// Main Conversion Function
function convert() {
  const rawValue = textbox.value.trim();

  if (rawValue === "" || isNaN(rawValue)) {
    result.textContent = "Select a unit";
    updateTheme(20); // Default neutral temp
    return;
  }
  

  temp = Number(rawValue);
  let celsiusEquivalent = temp;

  if (toFahrenheit.checked) {
    // Celsius input -> convert to Fahrenheit
    celsiusEquivalent = temp;
    const fahrenheit = (temp * 9) / 5 + 32;
    result.textContent = fahrenheit.toFixed(1) + "°F";
  } else if (toCelsius.checked) {
    // Fahrenheit input -> convert to Celsius
    celsiusEquivalent = (temp - 32) * (5 / 9);
    const celsius = celsiusEquivalent;
    result.textContent = celsius.toFixed(1) + "°C";
  } else {
    result.textContent = "Select a unit";
    return;
  }

  // Trigger result pulse pop animation
  result.classList.remove("updated");
  void result.offsetWidth; // Trigger reflow
  result.classList.add("updated");

  // Dynamic visual gauge & theme adjustment
  updateTheme(celsiusEquivalent);
}

// Dynamic visual gauge & background glow based on Celsius value
function updateTheme(celsiusVal) {
  // Gauge percentage (0°C = 0%, 100°C = 100%)
  let percentage = Math.min(Math.max((celsiusVal / 100) * 100, 5), 100);
  if (gaugeFill) {
    gaugeFill.style.width = `${percentage}%`;
  }

  // Color dynamic thresholding
  let accentColor, glowColor;

  if (celsiusVal <= 0) {
    accentColor = "#00f2fe"; // Icy Cold Cyan
    glowColor = "rgba(0, 242, 254, 0.35)";
  } else if (celsiusVal <= 22) {
    accentColor = "#10b981"; // Mild Emerald
    glowColor = "rgba(16, 185, 129, 0.35)";
  } else if (celsiusVal <= 38) {
    accentColor = "#f59e0b"; // Warm Amber
    glowColor = "rgba(245, 158, 11, 0.35)";
  } else {
    accentColor = "#ff4b2b"; // Fiery Hot Red
    glowColor = "rgba(255, 75, 43, 0.35)";
  }

  // Update CSS Variables dynamically
  document.documentElement.style.setProperty("--accent-current", accentColor);
  document.documentElement.style.setProperty("--accent-glow", glowColor);
}

// Preset Quick Buttons
function setPreset(val, unit) {
  textbox.value = val;
  if (unit === 'C') {
    toFahrenheit.checked = true; // Converting from °C to °F
  } else {
    toCelsius.checked = true; // Converting from °F to °C
  }
  convert();
}

// Copy Result to Clipboard
function copyResult() {
  const textToCopy = result.textContent;
  if (textToCopy && textToCopy !== "Select a unit") {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (copyTooltip) {
        copyTooltip.classList.add("show");
        setTimeout(() => {
          copyTooltip.classList.remove("show");
        }, 1500);
      }
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  }
}

// Live auto-conversion on user input or unit selection
textbox.addEventListener("input", convert);
toFahrenheit.addEventListener("change", convert);
toCelsius.addEventListener("change", convert);

// Initial call on page load
document.addEventListener("DOMContentLoaded", () => {
  convert();
});