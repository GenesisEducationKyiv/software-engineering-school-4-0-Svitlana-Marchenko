import {BaseChain} from "./chain";
import privatebankRateService from "./implementations/privatebank.rate.service";
import bankGovRateService from "./implementations/bank.gov.rate.service";
import exchangeapiRateService from "./implementations/exchangeapi.rate.service";

const privatBankChain = new BaseChain(privatebankRateService)
privatBankChain.setNext(new BaseChain(bankGovRateService)).setNext(new BaseChain(exchangeapiRateService))

export default privatBankChain