import {PrivateBankRateData} from "./rate.client.interface";
import axios from "axios";
import {CURRENCY, PRIVATBANK_URL} from "../../../config/rate.api.const";
import {IRateChainService} from "../chain";
import RateApiError from "../../../error/types/rateApi.error";
import rateLogger from "../../../helpers/logger/custom/rate.logger";
import {LogLevel} from "../../../helpers/logger/logger.interface";

export class PrivatebankRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<PrivateBankRateData[]>(PRIVATBANK_URL);
        rateLogger.rateLog(LogLevel.Info, 'api.privatbank.ua', JSON.stringify(response.data));
        const rateData = response.data.find(currency => currency.ccy === CURRENCY);
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData.buy;
    }

}
export default new PrivatebankRateService()