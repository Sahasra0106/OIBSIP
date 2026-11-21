
// Get HTML elements
const temperature = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

// Convert button click event
convertBtn.addEventListener("click", function () {

    // Get entered temperature
    const value = parseFloat(temperature.value);

    // Validate input
    if (temperature.value.trim() === "" || !Number.isFinite(value)) {
        result.textContent = "⚠️ Please enter a valid temperature!";
        return;
    }

    // Convert input into Celsius
    let celsius;

    if (fromUnit.value === "C") {
        celsius = value;
    }
    else if (fromUnit.value === "F") {
        celsius = (value - 32) * 5 / 9;
    }
    else {
        celsius = value - 273.15;
    }

    // Check absolute zero
    if (celsius < -273.15) {
        result.textContent = "⚠️ Below absolute zero is not possible!";
        return;
    }

    // Convert Celsius into selected unit
    let converted;

    if (toUnit.value === "C") {
        converted = celsius;
    }
    else if (toUnit.value === "F") {
        converted = (celsius * 9 / 5) + 32;
    }
    else {
        converted = celsius + 273.15;
    }

    // Select symbol based on temperature
    let icon;
    let condition;

    if (celsius >= 30) {
        icon = "🔥";
        condition = "Hot";
    }
    else if (celsius <= 15) {
        icon = "❄️";
        condition = "Cold";
    }
    else {
        icon = "🌤️";
        condition = "Normal";
    }

    // Get output unit symbol
    let unitSymbol = toUnit.value === "K"
        ? "K"
        : `°${toUnit.value}`;

    // Display result
    result.innerHTML = `
        <span class="result-symbol">${icon}</span>
        <span>${converted.toFixed(2)} ${unitSymbol}</span>
        <span class="condition">(${condition})</span>
    `;
});

// Reset button
resetBtn.addEventListener("click", function () {

    temperature.value = "";
    fromUnit.value = "C";
    toUnit.value = "F";

    result.innerHTML = `
        <span class="result-symbol">🌡️</span>
        <span>Result will appear here</span>
    `;
});
