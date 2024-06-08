const axios = require('axios');

const API = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
const CURRENCY = 'USD'

const getExchangeRate = async () => {
    try {
        const response = await axios.get(API);
        const rateData = response.data.find(currency => currency.ccy === CURRENCY)
        return parseFloat(rateData.buy);
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw new Error('Failed to fetch exchange rate');
    }
};

module.exports = {
    getExchangeRate
};
