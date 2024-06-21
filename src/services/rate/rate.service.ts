import {IRateService} from "./rate.service.interface";
import {BaseChain} from "./client/chain";
import privatebankRateService from "./client/privatebank.rate.service";
import exchangeapiRateService from "./client/exchangeapi.rate.service";
import bankGovRateService from "./client/bank.gov.rate.service";

export class RateService implements IRateService {

    async getExchangeRate(): Promise<number> {

        const privatBankChain = new BaseChain(privatebankRateService)
        const bankGovChain = new BaseChain(bankGovRateService)
        const exchangeApiChain = new BaseChain(exchangeapiRateService)

        privatBankChain.setNext(bankGovChain)
        bankGovChain.setNext(exchangeApiChain)

        return privatBankChain.getExchangeRate()

    }
}
export default new RateService();