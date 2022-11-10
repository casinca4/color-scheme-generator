const colorPicker = document.querySelector(".color-picker");
const selectColorMode = document.querySelector('.select-color-mode');
const getColorSchemeBtn = document.querySelector('.get-color-scheme-btn');
const colorSchemeContainer = document.querySelector(".color-scheme-container");
const instruction = document.querySelector(".instruction");
const currentSeedHexCode = document.querySelector(".seed-hex-code");
const currentSeedColor = document.querySelector(".seed-color");


function getColorScheme() {
  const colorMode = selectColorMode.value;
  const hexColorCode = colorPicker.value.replace ("#", "");
  currentSeedHexCode.innerHTML = "Seed hex code: ";
  currentSeedHexCode.innerHTML += colorPicker.value;
  let seedColor;

  fetch(`https://www.thecolorapi.com/scheme?hex=${hexColorCode}&mode=${colorMode}&count=5`)
  .then((res) => res.json())
  .then((data) => {
    colorSchemeContainer.innerHTML = "";
      let colorPalette = data.colors;
      seedColor = data.seed.name.value;
      currentSeedColor.innerHTML = `Seed color: ${seedColor}`;
      for (let color of colorPalette) {
        colorSchemeContainer.innerHTML += `
          <div class="color-item">
            <div class="color-box" style="background-color:${color.hex.value}"></div>
            <div class="color-code" onclick="copyToClipboard('${color.hex.value}')">${color.hex.value}</div>
            <div class="color-name">${color.name.value}</div>
          </div>
        `
      }
      instruction.style.visibility = "visible";
  })
}
getColorSchemeBtn.addEventListener('click', getColorScheme);

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
}

