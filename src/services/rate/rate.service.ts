import {IRateService} from "./rate.service.interface";
import {BaseChain} from "./client/chain";
import privatebankRateService from "./client/privatebank.rate.service";
import exchangeapiRateService from "./client/exchangeapi.rate.service";
import bankGovRateService from "./client/bank.gov.rate.service";
import logger from "../../helpers/logger";

export class RateService implements IRateService {

    private baseChain: BaseChain

    constructor() {
        const privatBankChain = new BaseChain(privatebankRateService)
        privatBankChain.setNext(new BaseChain(bankGovRateService)).setNext(new BaseChain(exchangeapiRateService))

        this.baseChain = privatBankChain
    }

    async getExchangeRate(): Promise<number> {
        logger.debug("Getting rate from api")
        return this.baseChain.getExchangeRate()
    }
}
export default new RateService();