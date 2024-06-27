import {IRateService} from "./rate.service.interface";
import {BaseChain} from "./client/chain";
import logger from "../../helpers/logger";
import privatBankChain from "./client/rate.chain.const";
import axios from 'axios';
import {IRateService, RateData} from "./rate.service.interface";
import RateApiError from "../../error/types/rateApi.error";

export class RateService implements IRateService {

    constructor(private baseChain: BaseChain) {
        this.baseChain = baseChain
    }

    async getExchangeRate(): Promise<number> {
        logger.debug("Getting rate from api")
        return this.baseChain.getExchangeRate()
    }
}
export default new RateService(privatBankChain);