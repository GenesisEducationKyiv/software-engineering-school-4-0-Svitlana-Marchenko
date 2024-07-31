import {Fawazahmed0ExchangeRateData} from "./rate.client.interface";
import axios from "axios";
import {EXCHANGE_API_URL} from "../../../config/rate.api.const";
import {IRateChainService} from "../chain";
import RateApiError from "../../../error/types/rateApi.error";
import rateLogger from "../../../helpers/logger/custom/rate.logger";
import {LogLevel} from "../../../helpers/logger/logger.interface";

export class ExchangeAPIRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<Fawazahmed0ExchangeRateData>(EXCHANGE_API_URL);
        rateLogger.rateLog(LogLevel.Info, 'cdn.jsdelivr.net', JSON.stringify(response.data));
        const rateData = response.data.usd.uah;
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData;
    }
}

export default new ExchangeAPIRateService()