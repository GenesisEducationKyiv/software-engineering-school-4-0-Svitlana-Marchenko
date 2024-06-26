import axios from 'axios';
import {IRateService, RateData} from "./rate.service.interface";
import RateApiError from "../../error/types/rateApi.error";

class RateService implements IRateService {
    private readonly apiUrl: string = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    private readonly currency: string = 'USD';

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<RateData[]>(this.apiUrl);
        if (!response) {
            throw new RateApiError({message: 'Rate API doesnt response', logging: true});
        }
        const rateData = response.data.find(currency => currency.ccy === this.currency);
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData.buy;
    }
}

export default new RateService();