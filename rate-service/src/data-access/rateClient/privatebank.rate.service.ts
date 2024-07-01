import {PrivateBankRateData} from "./rate.client.interface";
import axios from "axios";
import logger from "../../helpers/logger";
import {CURRENCY, PRIVATBANK_URL} from "../config/rate.api.const";
import {IRateChainService} from "../../service/client/chain";

export class PrivatebankRateService implements IRateChainService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<PrivateBankRateData[]>(PRIVATBANK_URL);
        logger.info(`api.privatbank.ua - Response: ${JSON.stringify(response.data)}`);
        const rateData = response.data.find(currency => currency.ccy === CURRENCY);
        if (!rateData) {
            throw new Error('Currency data not found');
        }
        return rateData.buy;
    }

}
export default new PrivatebankRateService()