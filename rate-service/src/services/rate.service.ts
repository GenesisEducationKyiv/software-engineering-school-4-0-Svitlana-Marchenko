import {IChain} from "./client/chain";
import privatBankChain from "./client/rate.chain.const";
import {IRateService} from "./rate.service.interface";
import loggerBase from "../helpers/logger/logger.base";
import {LogLevel} from "../helpers/logger/logger.interface";

export class RateService implements IRateService {

    constructor(private baseChain: IChain) {
        this.baseChain = baseChain
    }

    async getExchangeRate(): Promise<number> {
        loggerBase.log(LogLevel.Debug, "Getting rate from api")
        return this.baseChain.getExchangeRate()
    }
}
export default new RateService(privatBankChain);