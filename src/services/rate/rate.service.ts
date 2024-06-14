import axios from 'axios';
import {IRateService, RateData} from "./rate.service.interface";

class RateService implements IRateService {
    private readonly apiUrl: string = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    private readonly currency: string = 'USD';

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<RateData[]>(this.apiUrl);
        const rateData = response.data.find(currency => currency.ccy === this.currency);
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData.buy;
    }
}

export default new RateService();