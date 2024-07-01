import {Fawazahmed0ExchangeRateData} from "./rate.client.interface";
import axios from "axios";
import logger from "../../helpers/logger";
import {EXCHANGE_API_URL} from "../config/rate.api.const";
import {IRateChainService} from "../../service/services/rate/client/chain";

export class ExchangeAPIRateService implements IRateChainService{

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