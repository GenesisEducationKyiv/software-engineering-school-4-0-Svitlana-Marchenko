import {IRateService, PrivateBankRateData} from "../rate.service.interface";
import axios from "axios";
import {CURRENCY, PRIVATBANK_URL} from "../../../config/rate.api.const";
import rateLogger from "../../../helpers/logger/custom/rate.logger";
import RateApiError from "../../../error/types/rateApi.error";

export class PrivatebankRateService implements IRateService{

    async getExchangeRate(): Promise<number> {
        const response = await axios.get<PrivateBankRateData[]>(PRIVATBANK_URL);
        rateLogger.rateLog('info', 'api.privatbank.ua', response.data);
        const rateData = response.data.find(currency => currency.ccy === CURRENCY);
        if (!rateData) {
            throw new RateApiError({message: 'Currency data not found', logging: true});
        }
        return rateData.buy;
    }

}
export default new PrivatebankRateService()