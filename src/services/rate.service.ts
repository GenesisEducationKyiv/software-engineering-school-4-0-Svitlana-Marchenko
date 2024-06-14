import axios from 'axios';

const API = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const CURRENCY = 'USD';

interface RateData {
    ccy: string;
    base_ccy: string;
    buy: number;
    sale: number;
}

export const getExchangeRate = async (): Promise<number> => {
        const response = await axios.get<RateData[]>(API);
        const rateData = response.data.find((currency) => currency.ccy === CURRENCY);
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData.buy;
};

export default {
    getExchangeRate,
};
