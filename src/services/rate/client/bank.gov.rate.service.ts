import {BankGovRateData, IRateService} from "../rate.service.interface";
import axios from "axios";
import logger from "../../../helpers/logger";
import {BANK_GOV_URL, CURRENCY} from "../../../config/rate.api.const";

export class BankGovRateService implements IRateService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<BankGovRateData[]>(BANK_GOV_URL);
        logger.info(`bank.gov.ua - Response: ${JSON.stringify(response.data)}`);
        const rateData = response.data.find(currency => currency.cc === CURRENCY);
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData.rate;
    }
}
export default new BankGovRateService()