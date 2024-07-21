import {IRateService} from "./rate.service.interface";
import {BaseChain} from "./client/chain";
import privatBankChain from "./client/rate.chain.const";
import loggerBase from "../../helpers/logger/logger.base";

export class RateService implements IRateService {

    constructor(private baseChain: BaseChain) {
        this.baseChain = baseChain
    }

    async getExchangeRate(): Promise<number> {
        loggerBase.log('debug', "Getting rate from api")
        return this.baseChain.getExchangeRate()
    }
}
export default new RateService(privatBankChain);