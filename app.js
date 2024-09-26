document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const rateInfo = document.getElementById('rate');
    const rateTrend = document.getElementById('rate-trend');
    const historyList = document.getElementById('history-list');
    const convertBtn = document.getElementById('convertBtn');
    const themeSwitch = document.getElementById('theme-switch');

    // API URL and key
    const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

    // Fetching currency data
    async function fetchCurrencyData(base = 'USD') {
        try {
            const response = await fetch(`${API_URL}${base}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    }

    // Populate currency dropdowns
    async function populateCurrencySelect() {
        const data = await fetchCurrencyData();
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
    }

    // Convert currency
    convertBtn.addEventListener('click', async () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        const data = await fetchCurrencyData(from);
        const rate = data.rates[to];
        const result = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
        rateInfo.textContent = `1 ${from} = ${rate} ${to}`;
        rateTrend.textContent = rate > 1 ? '📈' : '📉';

        // Save to history
        const historyItem = document.createElement('li');
        historyItem.textContent = `${amount} ${from} = ${result} ${to}`;
        historyList.appendChild(historyItem);
    });

    // Theme toggle
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    populateCurrencySelect();
});
