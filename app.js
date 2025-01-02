 // Fetch current data from CoinGecko API
async function fetchData() {
    const selectedCoin = document.getElementById('coin-select').value;
    const coinPriceElement = document.getElementById('coin-price');
    const signalElement = document.getElementById('signals');

    try {
        // Fetch the current price of the selected coin
        const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd`);
        const priceData = await priceResponse.json();

        // Display the current price
        const price = priceData[selectedCoin].usd;
        coinPriceElement.textContent = `$${price}`;

        // Generate simple buy/sell signals (This should be replaced with better logic)
        const signal = generateSignal(price);

        // Display the signal
        signalElement.innerHTML = `
            <div class="signal-card">
                <p><strong>Action:</strong> ${signal.action}</p>
                <p><strong>Price:</strong> $${price}</p>
                <p><strong>Target Price:</strong> $${signal.targetPrice}</p>
                <p><strong>Stop Loss:</strong> $${signal.stopLoss}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        coinPriceElement.textContent = 'Error fetching data';
    }
}

// Simple logic for generating signals based on price
function generateSignal(price) {
    let action = 'Buy';
    if (price > 40000) { // Example condition for sell signal
        action = 'Sell';
    }

    // Simple strategy for target and stop loss (modify this logic as per your needs)
    const targetPrice = price * 1.05;
    const stopLoss = price * 0.95;

    return { action, targetPrice, stopLoss };
}

// Initial fetch when page loads
fetchData();
