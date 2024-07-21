import {Fawazahmed0ExchangeRateData, IRateService} from "../rate.service.interface";
import axios from "axios";
import {EXCHANGE_API_URL} from "../../../config/rate.api.const";
import rateLogger from "../../../helpers/logger/custom/rate.logger";

export class ExchangeAPIRateService implements IRateService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<Fawazahmed0ExchangeRateData>(EXCHANGE_API_URL);
        rateLogger.rateLog('info', 'cdn.jsdelivr.net', response.data);
        const rateData = response.data.usd.uah;
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData;
    }
}

export default new ExchangeAPIRateService()