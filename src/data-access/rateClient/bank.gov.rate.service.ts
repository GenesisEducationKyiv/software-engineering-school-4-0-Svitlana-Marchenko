import {IRateChainService} from "../../service/services/rate/client/chain";
import axios from "axios";
import {BankGovRateData} from "./rate.client.interface";
import logger from "../../helpers/logger";
import {BANK_GOV_URL, CURRENCY} from "../config/rate.api.const";

export class BankGovRateService implements IRateChainService{

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
export default new BankGovRateService();