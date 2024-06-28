import {Fawazahmed0ExchangeRateData, IRateService} from "../../service/services/rate/rate.service.interface";
import axios from "axios";
import logger from "../../helpers/logger";
import {EXCHANGE_API_URL} from "../config/rate.api.const";

export class ExchangeAPIRateService implements IRateService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<Fawazahmed0ExchangeRateData>(EXCHANGE_API_URL);
        logger.info(`cdn.jsdelivr.net - Response: ${JSON.stringify(response.data)}`);
        const rateData = response.data.usd.uah;
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData;
    }
}

export default new ExchangeAPIRateService()