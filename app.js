const selects = [...document.querySelectorAll('.select')];
const dropdowns = [...document.querySelectorAll('.dropdown')];
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
let exchangeRates = [];

fetch(`https://v6.exchangerate-api.com/v6/20d63f0c17da4dcf44d37bce/latest/USD`)
    .then(res => res.json())
    .then(data => {
        exchangeRates = data.conversion_rates;
        initData();
    });


function initData() {

    Object.keys(exchangeRates).map(key => {
        const option1 = document.createElement('div');
        option1.classList.add('option');
        option1.textContent = key;
        dropdowns[0].append(option1);

        const option2 = document.createElement('div');
        option2.classList.add('option');
        option2.textContent = key;
        dropdowns[1].append(option2);

        option1.addEventListener('click', updateCurrency);
        option2.addEventListener('click', updateCurrency);
    });
}

function updateCurrency(e) {
    const selectedOption = e.target.closest('.select').querySelector('.selected-option');
    const dropdown = e.target.closest('.dropdown');
    selectedOption.textContent = e.target.textContent;
    dropdown.style.display = 'none';

    const [val1, val2] = getCurrencyVal();
    convert(input1, input2, val1, val2);
}

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