import {IChain} from "./client/chain";
import logger from "../../helpers/logger";
import privatBankChain from "./client/rate.chain.const";
import {IRateService} from "./rate.service.interface";

export class RateService implements IRateService {

    constructor(private baseChain: IChain) {
        this.baseChain = baseChain
    }

    async getExchangeRate(): Promise<number> {
        logger.debug("Getting rate from api")
        return this.baseChain.getExchangeRate()
    }
}
export default new RateService(privatBankChain);