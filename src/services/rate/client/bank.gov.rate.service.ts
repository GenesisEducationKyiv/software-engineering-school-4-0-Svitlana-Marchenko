import {BankGovRateData, IRateService} from "../rate.service.interface";
import axios from "axios";
import {BANK_GOV_URL, CURRENCY} from "../../../config/rate.api.const";
import rateLogger from "../../../helpers/logger/custom/rate.logger";

export class BankGovRateService implements IRateService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<BankGovRateData[]>(BANK_GOV_URL);
        rateLogger.rateLog('info', 'bank.gov.ua', response.data);
        const rateData = response.data.find(currency => currency.cc === CURRENCY);
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData.rate;
    }
}
export default new BankGovRateService()