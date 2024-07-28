import {Fawazahmed0ExchangeRateData} from "./rate.client.interface";
import axios from "axios";
import {EXCHANGE_API_URL} from "../config/rate.api.const";
import {IRateChainService} from "../../service/services/rate/client/chain";
import RateApiError from "../../error/types/rateApi.error";
import rateLogger from "../../helpers/logger/custom/rate.logger";

export class ExchangeAPIRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<Fawazahmed0ExchangeRateData>(EXCHANGE_API_URL);
        rateLogger.rateLog('info', 'cdn.jsdelivr.net', response.data);
        const rateData = response.data.usd.uah;
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData;
    }
}

export default new ExchangeAPIRateService()