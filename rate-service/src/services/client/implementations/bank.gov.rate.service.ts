import {BankGovRateData} from "./rate.client.interface";
import axios from "axios";
import {BANK_GOV_URL, CURRENCY} from "../../../config/rate.api.const";
import {IRateChainService} from "../chain";
import RateApiError from "../../../error/types/rateApi.error";
import rateLogger from "../../../helpers/logger/custom/rate.logger";
import {LogLevel} from "../../../helpers/logger/logger.interface";

export class BankGovRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<BankGovRateData[]>(BANK_GOV_URL);
        rateLogger.rateLog(LogLevel.Info, 'bank.gov.ua', JSON.stringify(response.data));
        const rateData = response.data.find(currency => currency.cc === CURRENCY);
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData.rate;
    }
}
export default new BankGovRateService();