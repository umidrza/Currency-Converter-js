const selects = [...document.querySelectorAll('.select')];
const options = [...document.querySelectorAll('.option')];
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
let exchangeRates = [];

fetch(`https://v6.exchangerate-api.com/v6/20d63f0c17da4dcf44d37bce/latest/USD`)
    .then(res => res.json())
    .then(data => exchangeRates = data.conversion_rates);

input1.addEventListener("input", () => {
    const [val1, val2] = getCurrencyVal();
    convert(input1, input2, val1, val2);
});

input2.addEventListener("input", () => {
    const [val1, val2] = getCurrencyVal();
    convert(input2, input1, val2, val1);
});

function getCurrencyVal() {
    let currency1 = selects[0].querySelector('.selected-option').textContent.toUpperCase();
    let currency2 = selects[1].querySelector('.selected-option').textContent.toUpperCase();
    let val1 = +exchangeRates[currency1];
    let val2 = +exchangeRates[currency2];
    return [val1, val2];
}

function convert(input1, input2, val1, val2) {
    const convertedValue = input1.value * val2 / val1;
    input2.value = convertedValue !== 0 ? convertedValue.toFixed(2) : '';
}

selects.map(btn => {
    btn.addEventListener('click', () => {
        const dropdown = btn.querySelector('.dropdown');
        dropdown.classList.toggle('show');
    });
});

options.map((option, key) => {
    option.addEventListener('click', () => {
        const selectedOption = option.closest('.select').querySelector('.selected-option');
        const dropdown = option.closest('.dropdown');
        selectedOption.textContent = option.textContent;
        dropdown.style.display = 'none';

        const [val1, val2] = getCurrencyVal();
        convert(input1, input2, val1, val2);
    });
});
