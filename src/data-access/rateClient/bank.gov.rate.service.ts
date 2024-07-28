import {IRateChainService} from "../../service/services/rate/client/chain";
import axios from "axios";
import {BankGovRateData} from "./rate.client.interface";
import {BANK_GOV_URL, CURRENCY} from "../config/rate.api.const";
import rateLogger from "../../helpers/logger/custom/rate.logger";
import RateApiError from "../../error/types/rateApi.error";

export class BankGovRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<BankGovRateData[]>(BANK_GOV_URL);
        rateLogger.rateLog('info', 'bank.gov.ua', response.data);
        const rateData = response.data.find(currency => currency.cc === CURRENCY);
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData.rate;
    }
}
export default new BankGovRateService();